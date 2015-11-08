---
layout: post
title: OmegaBase | Entry Test Preparation App
modified: 2015-03-15
comments: true
tags: [project]
---

**Project completion date:** March 2015

**Total work duration:** Weekend in a Hackathon

**Language(s) used:** PHP, Objective C, MySQL

**Other team members:** Shahrukh, Asad, Gulzain

**My responsibilities:** Handling backend data storage and server processing; hence providing an API for the app to access server functionalities.

Our department SEECS recently organized a Social Hackathon sponsored by Telenor, Bentley & Alchaisoft. The aim of the Hackathon was to find innovative tech based solutions for some social problems relevant to our country. We built an entry test preparation app… and we won the first prize =D More project details given below

##The Idea:

Like India, college entry test preparation is a huge industry here in Pakistan. But unlike India, no tech based solution has exploited its potential yet. In fact Toppr from India recently raised $10M in funding and has around 200k students using its platform. Thus during brainstorming as soon as the idea of building an app for this niche came up, we hung to it.

Currently in Pakistan, there are specific institutions which prepare students for entry tests. Since almost all college entry tests are MCQs based here, these institutions follow a simple training procedure; they aggregate hundreds of MCQs from different subjects and then during a course of 3 months they go through them one by one explaining the reasoning for each correct option to the students. But these institutions are very expensive for the majority of students in Pakistan. So we had an opportunity to modernize this via a tech based much cheaper and effective solution.

So the idea was to build an app which would contain hundreds of MCQs provided by us. Students can practice those questions but if anyone wants some explanation for an MCQ he can simply ask for it from other users of the app. Wait let me explain why it's not like Quora: (i) In Stackoverflow, Quora etc. people ask questions first to which the community answers. In our case the questions are already present in the app, a student just needs to click a button if he wants an explanation for any specific question. (ii) We provide an excellent motivation for students to participate in providing explanations to other students; someone proficient in Physics would gladly write short explanations for that category MCQs as he himself is also seeking for explanations from others in subjects he's not proficient at. Plus explaining a concept to others actually increases one's own understanding too.    
 
##The App:

Here was the total functionality of the app from end-user's perspective:

1) Sign in / Sign up with an email address and password.
2) Explore practice MCQs from any category like Physics, Mathematics etc.
3) Chose the answer you think is correct from the options provided for any specific MCQ. If your answer is actually correct, move on to the next MCQ.
4) If your answer is not correct and you need an explanation for the correct answer, simply click a button to notify all other users of the app that you need help regarding that specific MCQ.
5) While exploring MCQs, keep an eye on those for which others have asked for explanations. If you think you know the reasoning behind the correct option, write a short explanation for that MCQ from the text field provided there.

Here is the demonstration video for our actual app we developed:

# The Code:

Most of my time was spent on figuring out a nice relational database schema to hold all information effectively. Other than that, the PHP code is very trivial and contains only data insertion / retrieval calls. The API is simple too; the app calls getOriginal.php with different values in $_POST[intent] depending on what it wants from the server.

###Logic for MySQL Database:

###Code for getOriginal.PHP:

{% highlight php %}
<?php
  header('Content-type: application/json');

  $intent = $_POST["intent"];

  $conn = mysqli_connect("localhost", "XXXXXX", "XXXXXX", "XXXXXX");
  //start of API

  //SIGNIN
  if($intent=="signin"){
    $inputEmail = $_POST["mail"];
    $inputPass = $_POST["password"];

    $sql = "select * from user where email = '$inputEmail' and password = '$inputPass'";
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result)  > 0) {

      while($row = mysqli_fetch_assoc($result)) {
        $name =  $row["name"];
        $type =  $row["type"];
        $university =  $row["university"];
        $degree =  $row["degree"];
        $id = $row["id"];
      }

      $userArray = array ("verified" => "true","name"=>"$name",
        "type"=>"$type",
        "university"=>"$university",
        "degree"=>"$degree", "id" => "$id");
    } else {

     $sql = "select * from user where email = '$inputEmail'";
     $result = mysqli_query($conn, $sql);

     if (mysqli_num_rows($result)  > 0) {

      $userArray = array ("verified" => "incorrect");

    } else {

      $userArray = array ("verified" => "notExist");

    }
  }
  echo json_encode($userArray);

  }


 	//SIGNUP
  if($intent=="signup"){
    $email = $_POST["mail"];
    $pass = $_POST["password"];
    $name = $_POST['name'];
    $type = $_POST['type'];
    $university = $_POST['university'];
    $degree = $_POST['degree'];

    if($type == 2){

      $sql = "insert into user set name = '$name' , email = '$email' , type = '$type' , university = '$university' , dergree = '$degree' , password = '$pass' ";

    } else {

      $sql = "insert into user set name = '$name' , email = '$email' , type = '$type' , password = '$pass' ";

    }

    $id;

    if (mysqli_query($conn, $sql)) {

     $sql = "select * from user where email = '$email' and password = '$pass'";
     $result = mysqli_query($conn, $sql);


     while($row = mysqli_fetch_assoc($result)) {
      $id = $row["id"];
    }

    $signUpArray = array ("success" => "true","id" => "$id");

  }

  else {
    $signUpArray = array("success" => "false");
  }

  echo json_encode($signUpArray);

  }

  //MCQ
  if($intent=="getMCQ"){
    $category = $_POST["subject"];
    $prev = $_POST["prev"];

    $prevMCQS = explode(";",$prev); 

    $mcqId;
    $sql = "SELECT * FROM mcq WHERE category = '$category' ";
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result)  > 0) {

      while($row = mysqli_fetch_assoc($result)) {

       $mcqId = $row[id];

       if(in_array(intval($mcqId),$prevMCQS)){
         continue;
       }
       $question = $row[question];
       $ansOne = $row[ansOne];
       $ansTwo = $row[ansTwo];
       $ansThree = $row[ansThree];
       $ansFour = $row[ansFour];

       $answer = $row[answer];

       $needExplanation = $row[needExplanation];

       $mcqArray = array ("success" => "true", "question" => "$question", "id" => "$mcqId", "ansOne" => "$ansOne","ansTwo" => "$ansTwo", "ansThree" => "$ansThree","ansFour" => 
        "$ansFour", "needExplanation" => "$needExplanation", "correct" => "$answer");

       break;
     }

     if($mcqArray == null){

      $mcqArray = array ("success" => "false");

    }
  }

  else {

    $mcqArray = array ("success" => "false");

  }

  echo json_encode($mcqArray);
  }

  //////////////////ASAD

  if($intent=="getMCQExplanation"){

    $mcqID = $_POST["mcqID"];
    
    $sql = "SELECT * FROM mcqExplanations WHERE mcqID = '$mcqID' ORDER BY upvoteCount DESC ";

    $result = mysqli_query($conn, $sql);

    $bariArray = array(array());
    $IDcount = 1;
    if (mysqli_num_rows($result)  > 0) {

      while($row = mysqli_fetch_assoc($result)) {

        $userID = $row[givenBy];
        $sqlName = "SELECT * FROM user WHERE id = $userID ";
        $resultName = mysqli_query($conn, $sqlName);
        $rowName = mysqli_fetch_assoc($resultName);
        $userName = $rowName[name];


        $givenBy = $row[givenBy];
        $mcqID = $row[mcqID];
        $upvoteCount = $row[upvoteCount];
        $explanation = $row[content];


        $singleArr = array( 	"IDCount"	=> $IDcount,
         "userName"    	=>  $userName,
         "givenBy"     	=>  $givenBy,
         "mcqID"       	=>  $mcqID,
         "upvoteCount" 	=>  $upvoteCount,
         "explanation" 	=>  $explanation
         );
        $IDcount++;
        array_push($bariArray, $singleArr);
      }
    }

    else {

      $bariArray= array ("success" => "false");

    }

  	//echo serialize($bariArray);
    array_shift($bariArray);
    echo json_encode(array("success" => "true","data"=>$bariArray));
  		//print_r($bariArray);
  }

  if($intent=="getMCQExplanation1"){

    $mcqID = $_POST["mcqID"];
    
    $sql = "SELECT mcqExplanations.mcqID, mcqExplanations.givenBy, mcqExplanations.id, mcqExplanations.content, user.name, mcqExplanations.upvoteCount  FROM mcqExplanations, user WHERE mcqID = '$mcqID' and user.id = mcqExplanations.givenBy ORDER BY upvoteCount DESC ";

    $result = mysqli_query($conn, $sql);

    $bariArray = array(array());
    $IDcount = 1;
    if (mysqli_num_rows($result)  > 0) {

      while($row = mysqli_fetch_assoc($result)) {

       $userName = $row[name];	
       $givenBy = $row[givenBy];
       $mcqID = $row[mcqID];
       $upvoteCount = $row[upvoteCount];
       $explanation = $row[content];
       $explanationID = $row[id];

       $singleArr = array( 	"IDCount"	=> $IDcount,
         "userName"    	=>  $userName,
         "givenBy"     	=>  $givenBy,
         "mcqID"       	=>  $mcqID,
         "upvoteCount" 	=>  $upvoteCount,
         "explanation" 	=>  $explanation,
         "explanationID" => $explanationID
         );
       $IDcount++;
       array_push($bariArray, $singleArr);
     }

   }

   else {

    echo json_encode(array("success" => "false")); exit(0);

  }

    array_shift($bariArray);
    echo json_encode(array("success" => "true","data"=>$bariArray));
  }

  if($intent=="askasenior"){

    $message= $_POST["message"];
    $sentBy = $_POST["sentby"];
    $university = $_POST["university"];
    $degree = $_POST["degree"];
    

    
    $sql = "SELECT * FROM user WHERE university = '$university' and dergree = '$degree' ";
    
    $result = mysqli_query($conn, $sql);
    
    
    if (mysqli_num_rows($result)  > 0) {

      while($row = mysqli_fetch_assoc($result)) {


       $userID = $row['id'];


     } 




     $recievedBy = $userID ;

   }


   else {

    echo json_encode(array("success" => "false2"));

    die();  

  }

    $sql = "INSERT INTO chat SET sentBy = '$sentBy' , receivedBy = '$recievedBy', message = '$message'  ";

    $result = mysqli_query($conn, $sql);

    if (mysqli_query($conn, $sql)) {
      echo json_encode(array ("success" => "true"));
  }
  else {
    echo json_encode(array("success" => "false1"));
    die();  
  }

  }

 	//Put Explanation
  if($intent=="putexplanation"){

    $givenBy = $_POST["userID"];
    $mcqID = $_POST["mcqID"];
    $content = $_POST['explanation'];


    $sql = "insert into mcqExplanations set givenBy = '$givenBy' , mcqID = '$mcqID' , content = '$content' , upvoteCount = 0 ";


    if (mysqli_query($conn, $sql)) {
      $signUpArray = array ("success" => "true");
    }

    else {

      $signUpArray = array("success" => "false");

    }

    $sql = "UPDATE mcq SET needExplanation = '0' WHERE id = '$mcqID'";
    mysqli_query($conn, $sql);

    echo json_encode($signUpArray);
  }

          //Request Explanation
  if($intent=="needexplanation"){

    $givenBy = $_POST["userID"];
    $mcqID = $_POST["mcqID"];



    $sql = "UPDATE mcq SET needExplanation = '1' WHERE id = '$mcqID'";




    if (mysqli_query($conn, $sql)) {


     $pushArray= array ("success" => "true");

   }

   else {
    $pushArray= array("success" => "false");

    }

    echo json_encode($pushArray);
  }

  //Upvote Explanation
  if($intent=="upvote"){

    $explanationID = $_POST["explanationID"];

    $sql = "SELECT * FROM mcqExplanations where id = '$explanationID'";

    if (mysqli_query($conn, $sql)) {
     $pushArray= array ("success" => "true");
    }

   else {
    $pushArray= array("success" => "false");
   }

    echo json_encode($pushArray);
  }
?>
{% endhighlight %}

