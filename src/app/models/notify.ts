export class Notify {

  public Id : string;
  public NotificationInfo : string;
  public CreatedAt : Date;

  constructor(Id: string, NotificationInfo: string, CreatedAt: Date) {
    this.Id = Id;
    this.NotificationInfo = NotificationInfo;
    this.CreatedAt = CreatedAt;
  }
}