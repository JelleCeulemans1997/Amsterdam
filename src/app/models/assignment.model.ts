export class Assignment {
  constructor(
    public id: string,
    public title: string,
    public tags: string[],
    public location: {
      street: string,
      nr: string,
      city: string,
      zipcode: string
    },
    public pdf: string) { }
}
