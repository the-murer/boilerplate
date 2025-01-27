
export class NotFoundException extends Error {
    constructor(message: string) {
        super(message);
        this.name = "NotFoundException";
    }
}

export class RequestError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "RequestError";
  }
}
