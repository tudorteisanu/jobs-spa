export interface JobInterface {
  id: string;
  title: string
  description: string
  company: string
  location: string
  industry: string
  jobType: "full-time",
  salaryRange: [number, number],
  postDate: Date;
  expiryDate: Date;
  source: string;
  externalUrl: string
  keywords: string[]
}
