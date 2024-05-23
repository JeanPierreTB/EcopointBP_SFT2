import { VerificationStrategy } from "./VerificationStrategy";
export class DniVerificationStrategy implements VerificationStrategy {
    verify(value: string): boolean {
        const dniRegex = /^\d{8}$/;
        return dniRegex.test(value);
    }
}

