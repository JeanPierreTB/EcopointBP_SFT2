import { VerificationStrategy } from "./VerificationStrategy";
export class EmailVerificationStrategy implements VerificationStrategy {
    verify(value: string): boolean {
        const emailRegex = /\S+@\S+\.\S+/;
        return emailRegex.test(value);
    }
}

