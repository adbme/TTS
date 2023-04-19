<?php
use GuzzleHttp\{Client};
use Microsoft\Graph\Graph;
use Microsoft\Graph\Model;

class GraphHelper
{
    private static string $clientId;
    private static string $tenantId;
    private static Graph $userClient;
    public static string $userToken;

    public static function initializeGraphForUserAuth(): void
    {
        $dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
        $dotenv->load();
        $dotenv->required(['CLIENT_ID', 'TENANT_ID', 'GRAPH_USER_SCOPES', 'CLIENT_SECRET']);
        GraphHelper::$clientId = $_ENV['CLIENT_ID'];
        GraphHelper::$tenantId = $_ENV['TENANT_ID'];
        GraphHelper::$userClient = new Graph();
    }

    public static function login()
    {
        GraphHelper::initializeGraphForUserAuth();
        if ($_GET['action'] == 'login') {
            $login_url = "https://login.microsoftonline.com/" . GraphHelper::$tenantId . "/oauth2/v2.0/authorize";
            $params = array('client_id' => GraphHelper::$clientId,
                'redirect_uri' => 'http://localhost:8080/3Dpage.php',
                'response_type' => 'token',
                'response_mode' => 'form_post',
                'scope' => 'https://graph.microsoft.com/User.Read',
                'state' => $_SESSION['state']);
            header('Location: ' . $login_url . '?' . http_build_query($params));
        }
        echo '
    <script> url = window.location.href;
    i=url.indexOf("#");
    if(i>0) {
     url=url.replace("#","?");
     window.location.href=url;}
    </script>';
        if (array_key_exists('access_token', $_POST)) {
            $_SESSION['t'] = $_POST['access_token'];
            $token = $_SESSION['t'];
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_HTTPHEADER, array('Authorization: Bearer ' . $token,
                'Conent-type: application/json'));
            curl_setopt($ch, CURLOPT_URL, "https://graph.microsoft.com/v1.0/me/");
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
            $rez = json_decode(curl_exec($ch), 1);
            if (array_key_exists('error', $rez)) {
                var_dump($rez['error']);
                die();
            } else {
                $_SESSION['msatg'] = 1;
                $_SESSION['uname'] = $rez["displayName"];
                $_SESSION['id'] = $rez["id"];
                self::getRoom();
            }
            curl_close($ch);
            header('Location: http://localhost:8080/3Dpage.php');
        }
        if ($_GET['action'] == 'logout') {
            unset ($_SESSION['msatg']);
            unset ($_SESSION['t']);
            unset ($_SESSION['uname']);
            header('Location: http://localhost:8080/index.php');
        }

    }

    public static function getMicrosoftUserProfileinfo()
    {

        if (!isset($_SESSION['msatg'])) {
            return;
        }
        // Récupérer l'image de profil de l'utilisateur
        GraphHelper::$userClient->setAccessToken($_SESSION['t']);
        $url = "https://graph.microsoft.com/v1.0/me/photo/\$value";
        $headers = array(
            "Authorization: Bearer " . $_SESSION['t'],
        );
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $response = curl_exec($ch);
        $httpcode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        // Si la requête a réussi, afficher l'image de profil dans la navbar
        if ($httpcode == 200) {
            $image = '<img src="data:image/jpeg;base64,' . base64_encode($response) . '" class="rounded-circle" width="50" height="50">';
            echo '<div class="nav-item dropdown">';
            echo '<a href="#" data-toggle="dropdown" class="nav-item nav-link dropdown-toggle user-action">';
            echo $image;
            echo $_SESSION['uname'];
            echo '<div class="dropdown-menu">';
            echo '<a href="https://myaccount.microsoft.com" class="dropdown-item"><i class="fa fa-user-o"></i> Profile</a>';
            echo '<a href="?action=logout" class="dropdown-item">Logout</a>';
            echo '</div>';
        } else {
            echo "Impossible de récupérer l'image de profil.";
        }
    }

    public static function getRoom(): void
    {
        $token = $_SESSION['t'];
        GraphHelper::$userClient->setAccessToken($token);
        $graph = new Graph();
        $graph->setBaseUrl("https://graph.microsoft.com/v1.0/");
        $graph->setAccessToken($token);
        $rooms = $graph->createRequest("GET", "https://graph.microsoft.com/v1.0/places/microsoft.graph.room")
            ->setReturnType(Model\Room::class)
            ->execute();
        $filteredRooms = array_filter($rooms, function ($room) {
            return str_contains($room->getDisplayName(), "Lausanne");
        });
        $jsonData = json_encode($filteredRooms);
        file_put_contents("rooms.json", $jsonData);
        $roomEmails = array_map(function ($filteredRooms) {
            $properties = $filteredRooms->getProperties();
            return $properties["emailAddress"];
        }, $filteredRooms);
        $globalarray = array();
        foreach ($roomEmails as $roommail) {
            $currentTime = time();
            $startDateTime = date("c", $currentTime);
            $endDateTime = date("c", $currentTime + 1);
            $curl = curl_init();
            curl_setopt_array($curl, array(
                CURLOPT_URL => "https://graph.microsoft.com/v1.0/users/" . urlencode($roommail) . "/calendar/calendarView?startDateTime=" . urlencode($startDateTime) . "&endDateTime=" . urlencode($endDateTime),
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_ENCODING => "",
                CURLOPT_MAXREDIRS => 10,
                CURLOPT_TIMEOUT => 0,
                CURLOPT_FOLLOWLOCATION => true,
                CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
                CURLOPT_CUSTOMREQUEST => "GET",
                CURLOPT_HTTPHEADER => array(
                    "Authorization: Bearer " . $token,
                    "Content-Type: application/json"
                ),
            ));

            $response = curl_exec($curl);
            $err = curl_error($curl);

            curl_close($curl);

            if ($err) {
                echo "cURL Error #:" . $err;
            } else {
                $schedules = json_decode($response);
                $availability = "Available";
                if (count($schedules->value) > 0) {
                    $availability = "Not available";
                }

                $scheduleData = array(
                    "roomName" => $roommail,
                    "availability" => $availability
                );
                array_push($globalarray, $scheduleData);

            }
        }
        $scheduleFile = fopen("schedules.json", "w");
        fwrite($scheduleFile, "\n" . json_encode($globalarray));
        fclose($scheduleFile);
        self::GetEventuser($roomEmails);
    }

    private static function GetEventuser($jsonData): void
    {
        // Vérifier que la liste des salles
        if ($jsonData && isset($jsonData)) {
            $roomEmails = $jsonData;
            // Parcours de chaque salle pour récupérer ses événements
            $globalarray = [];
            foreach ($roomEmails as $room) {
                // Configuration de l'objet cURL pour envoyer la requête pour récupérer les événements de la salle
                $currentTime = time();
                $startDateTime = date("c", $currentTime);
                $endDateTime = date("c", $currentTime + 1);
                $curl = curl_init();
                curl_setopt_array($curl, array(
                    CURLOPT_URL => "https://graph.microsoft.com/v1.0/users/" . urlencode($room) . "/calendar/calendarView?startDateTime=" . urlencode($startDateTime) . "&endDateTime=" . urlencode($endDateTime),
                    CURLOPT_RETURNTRANSFER => true,
                    CURLOPT_ENCODING => "",
                    CURLOPT_MAXREDIRS => 10,
                    CURLOPT_TIMEOUT => 0,
                    CURLOPT_FOLLOWLOCATION => true,
                    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
                    CURLOPT_CUSTOMREQUEST => "GET",
                    CURLOPT_HTTPHEADER => array(
                        "Authorization: Bearer " . $_SESSION['t'],
                        "Content-Type: application/json"
                    ),
                ));

                $response = curl_exec($curl);
                $err = curl_error($curl);

                curl_close($curl);

                // Transformation de la réponse JSON en un tableau associatif PHP
                if ($err) {
                    echo "cURL Error #:" . $err;
                } else {
                    $schedules = json_decode($response,true);
                    foreach ($schedules['value'] as $event) {
                        if($event != null){
                        // On récupère le sujet de l'événement
                        $subject = $event['subject'];
                        // On récupère le tableau "organizer"
                        $organizer = $event['organizer'];
                        $location = $event['location'];

                        // On stocke les données dans un nouvel array
                        $eventData = array(
                            'subject' => $subject,
                            'organizer' => $organizer,
                            'lieux' => $location
                        );

                        // On ajoute l'array $eventData à l'array "events" du fichier JSON
                        $schedule['events'] = $eventData;
                        array_push($globalarray,$schedule);
                        }
                    }
                }
            }
            $eventfile = fopen("events.json", "w");
            fwrite($eventfile, "\n" . json_encode($globalarray));
            fclose($eventfile);
        }
    }
}