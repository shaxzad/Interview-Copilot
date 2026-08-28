import {
  PageMeta,
  EcommerceMetrics,
  MonthlySalesChart,
  StatisticsChart,
  MonthlyTarget,
  RecentOrders,
  DemographicCard,
} from '@companyio/platform-ui';

export default function Home() {
  return (
    <>
      <PageMeta
        title="React.js Ecommerce Dashboard | TailAdmin - React.js Admin Dashboard Template"
        description="This is React.js Ecommerce Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 space-y-6 xl:col-span-7">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Id nesciunt asperiores quam
            aliquid saepe, neque temporibus, sequi assumenda accusantium natus corrupti magnam
            incidunt ipsum iure soluta voluptatibus veritatis blanditiis excepturi.
          </p>
        </div>
      </div>
    </>
  );
}
