public class BasicUseCasesInApex {
    public static String correctPassword ='salseforce';
    public static Integer counter = 1;
    
    public static void multipleAttempts()
    {
        string finalAns='';
        finalAns = handlePasswordAttempts('abhay');
    System.debug(finalAns);

    finalAns = handlePasswordAttempts('bharat');
    System.debug(finalAns);

    finalAns = handlePasswordAttempts('sikandar');
    System.debug(finalAns);

    finalAns = handlePasswordAttempts('mahesh');
    System.debug(finalAns);
    }

public static String handlePasswordAttempts( String passwordInput)
{
    if(passwordInput != correctPassword)
    {
        counter++;
        if(counter >3)
        {
            return 'max attempt reach';
        }
        return 'failure';
    }
    else {
        return 'success';
    }
}

}