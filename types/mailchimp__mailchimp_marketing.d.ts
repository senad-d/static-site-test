declare module "@mailchimp/mailchimp_marketing" {
  // Minimal type surface used by this project. Extend as needed.
  export interface MailchimpConfig {
    apiKey: string;
    server: string;
  }

  export interface SetListMemberInput {
    email_address: string;
    status_if_new?: "subscribed" | "unsubscribed" | "cleaned" | "pending" | "transactional";
    status?: "subscribed" | "unsubscribed" | "cleaned" | "pending" | "transactional";
    merge_fields?: Record<string, string | undefined>;
    tags?: string[];
  }

  export interface ListsClient {
    setListMember(
      listId: string,
      subscriberHash: string,
      data: SetListMemberInput,
    ): Promise<unknown>;
  }

  export interface MailchimpClient {
    setConfig(config: MailchimpConfig): void;
    lists: ListsClient;
  }

  const client: MailchimpClient;
  export default client;
}