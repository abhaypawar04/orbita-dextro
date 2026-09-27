
import java.util.Scanner;

class UserIP {

    public static void main(String[] args) {
// scanner 

        Scanner scanner = new Scanner(System.in);
        System.out.println("enter your name: ");
        String name = scanner.nextLine();

        System.out.println("hello " + name);
        scanner.close();
    }
}
