import { VerificationStrategy } from "./VerificationStrategy";
export class Validador{
    private verificationStrategy: VerificationStrategy;

  constructor(verificationStrategy: VerificationStrategy) {
    this.verificationStrategy = verificationStrategy;
  }

  setVerificationStrategy(verificationStrategy: VerificationStrategy) {
    this.verificationStrategy = verificationStrategy;
  }

  verify(value: string): boolean {
    return this.verificationStrategy.verify(value);
  }

}

