export interface ISocialMediaProps {
  platform: string;
  url: string;
  icon: string;
  followers?: string;
  subscribers?: string;
}

export class SocialMedia {
  public platform: string;
  public url: string;
  public icon: string;
  public followers?: string;
  public subscribers?: string;

  constructor(props: ISocialMediaProps) {
    this.platform = props.platform;
    this.url = props.url;
    this.icon = props.icon;
    this.followers = props.followers;
    this.subscribers = props.subscribers;
  }

  public getAudienceCount(): string {
    return this.followers || this.subscribers || '0';
  }

  public toJSON() {
    return {
      platform: this.platform,
      url: this.url,
      icon: this.icon,
      followers: this.followers,
      subscribers: this.subscribers,
    };
  }
}