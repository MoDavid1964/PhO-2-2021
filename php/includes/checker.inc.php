<?php
    define("TOLERANCE", 0.01);
    define("META_TOLERANCE", TOLERANCE * 0.001);
    
    // Checks the correctness of an answer
    function checkAnswer($userAnswerRaw, $problemAnswerRaw, $problemHasTol){
    
        // Make sure answer is within tolerance
        // Assumes answer key is never misformatted
        $userAnswer = explode("e", trim(strtolower($userAnswerRaw)));
        $problemAnswer = explode("e", trim(strtolower($problemAnswerRaw)));
        array_push($problemAnswer, "0");

        if(!strpos($userAnswer[0], ".")) { $userAnswer[0] = $userAnswer[0]."."; }
        $userMantissa = trim($userAnswer[0], "0");
        $userExponent = $userAnswer[1];

        if(!strpos($problemAnswer[0], ".")) { $problemAnswer[0] = $problemAnswer[0]."."; }
        $keyMantissa = $problemAnswer[0];
        $keyExponent = $problemAnswer[1];

        // User mantissa should be > 1 and < 10
        $mantissaFloatArray = explode(".", $userMantissa);
        $userMantissaOffSet = 0;

        if(count($mantissaFloatArray) > 1){
            if(intval($userMantissa) == 0){
                while(substr($mantissaFloatArray[1], 0, 1) == "0"){
                    $mantissaFloatArray[1] = substr($mantissaFloatArray[1], 1);
                    $userMantissaOffSet--;
                }

                // In case there's too many zeros cuz fuck em
                $userMantissa = substr($mantissaFloatArray[1], 0, 1).".".substr($mantissaFloatArray[1], 1);
                $userMantissaOffSet--;
            } else {
                if(intval($userMantissa > 10)){

                    // In case mantissa is too big cuz damn why would u do that
                    while(intval($mantissaFloatArray[0]) >= 10){
                        $mantissaFloatArray[1] = substr($mantissaFloatArray[0], -1).$mantissaFloatArray[1];
                        $mantissaFloatArray[0] = substr($mantissaFloatArray[0], 0, -1);
                        $userMantissaOffSet++;
                    }

                    $userMantissa = $mantissaFloatArray[0].".".$mantissaFloatArray[1];
                }
            }
        }

        // Problem key mantissa should also be between 1 and 10
        $mantissaFloatArray = explode(".", $keyMantissa);
        $keyMantissaOffSet = 0;

        if(count($mantissaFloatArray) > 1){
            if(intval($keyMantissa) == 0){
                while(substr($mantissaFloatArray[1], 0, 1) == "0"){
                    $mantissaFloatArray[1] = substr($mantissaFloatArray[1], 1);
                    $keyMantissaOffSet--;
                }

                // In case there's too many zeros cuz fuck em
                $keyMantissa = substr($mantissaFloatArray[1], 0, 1).".".substr($mantissaFloatArray[1], 1);
                $keyMantissaOffSet--;
            } else {
                if(intval($keyMantissa > 10)){

                    // In case mantissa is too big cuz damn why would u do that
                    while(intval($mantissaFloatArray[0]) >= 10){
                        $mantissaFloatArray[1] = substr($mantissaFloatArray[0], -1).$mantissaFloatArray[1];
                        $mantissaFloatArray[0] = substr($mantissaFloatArray[0], 0, -1);
                        $keyMantissaOffSet++;
                    }

                    $keyMantissa = $mantissaFloatArray[0].".".$mantissaFloatArray[1];
                }
            }
        }

        // Parse the values from the string
        $userMantissaFloatVal = floatval($userMantissa);
        $userExponentIntVal = intval($userExponent) + $userMantissaOffSet;

        $keyMantissaFloatVal = floatval($keyMantissa);
        $keyExponentIntVal = intval($keyExponent) + $keyMantissaOffSet;

        // Discriminator evaluation
        $verdict = false;
        if($keyMantissaFloatVal == 0){
            if($userMantissaFloatVal == 0){
                $verdict = true;
            }
        } else {

            // The discriminator yes
            $discriminator = log10($userMantissaFloatVal / $keyMantissaFloatVal) + $userExponentIntVal - $keyExponentIntVal;
		    $tolerance = TOLERANCE + META_TOLERANCE;
		    
            if($problemHasTol == 1){
                if($discriminator >= log10(1 - $tolerance) && $discriminator <= log10(1 + $tolerance)){
                    $verdict = true;
                }
            } else {
                if(round($userMantissaFloatVal * 1000) == round($keyMantissaFloatVal * 1000) && $userExponentIntVal == $keyExponentIntVal){
                    $verdict = true;
                }   
            }
        }

        return $verdict;
    }
?>
