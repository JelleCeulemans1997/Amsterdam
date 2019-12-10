export class Assignment {
  constructor(
    public id: string,
    public title: string,
    public tags: string[],
    public location: {
      street: string,
      nr: string,
      zipcode: string,
      city: string
    }//,
    //public pdf: string
    ) { }
}
