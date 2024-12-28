export interface DashboardChecklist {
  uuid: string;
  title: string;
  description: string;
  ownerId: string;
  criterionAggregates: { pass: number, fail: number, TBD: number };
  reviewAggregates: { completed: number, uncompleted: number };
}
