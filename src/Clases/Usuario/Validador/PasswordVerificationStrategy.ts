import { VerificationStrategy } from "./VerificationStrategy";
export class PasswordVerificationStrategy implements VerificationStrategy {
    verify(value: string): boolean {
        const passwordRegex = /.{8,}/;
        return passwordRegex.test(value);
    }
}


