import AppAreaChart from "@/components/ui/AppAreaChart"
import AppBarChart from "@/components/ui/AppBarChart"
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink } from "@/components/ui/breadcrumb"
import FactureGenChart from "@/components/ui/FactureGenereesChart"
import AppPieChart from "@/components/ui/PieChart"
import { CheckCheck, CircleSlash2, Minimize2 } from "lucide-react"

const Homepage = () => {
  return (
    <div className="p-1">
      <Breadcrumb className="">
                      <BreadcrumbList>
                        <BreadcrumbItem>
                          <BreadcrumbLink href="/acceuil">Acceuil</BreadcrumbLink>
                        </BreadcrumbItem>
                      </BreadcrumbList>
      </Breadcrumb>
      {/* Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Card 1 */}
        <div className="relative bg-primary-foreground p-6 rounded-lg overflow-hidden">
          
          <Minimize2 className="absolute top-4 left-4 bg-blue-500 text-white p-1 rounded-full w-10 h-10 z-10" />
          
          {/* Text content (smaller text) */}
          <div className="relative z-10 absolute top-2 left-8 ml-5">
            <h1 className="text-base sm:text-lg md:text-xl font-semibold">Facture Générées</h1>
            <p className="text-lg font-bold text-gray-800 dark:text-white mt-1">20 000,00 DA</p>
          </div>

          {/* Chart on the right */}
          <div className="absolute top-0 right-8 w-20 h-20">
            <FactureGenChart />
          </div>
        </div>

        {/* Card 2 */}
        <div className="relative bg-primary-foreground p-6 rounded-lg overflow-hidden">
          <CheckCheck className="absolute top-4 left-4 bg-green-500 text-white p-1 rounded-full w-10 h-10 z-10" />
          <div className="relative z-10 absolute top-2 left-8 ml-5">
            <h1 className="text-base sm:text-lg md:text-xl font-semibold">Facture Payées</h1>
            <p className="text-lg font-bold text-gray-800 dark:text-white mt-1">50 000,00 DA</p>
          </div>

             {/* Chart on the right */}
          <div className="absolute top-0 right-8 w-20 h-20">
            <FactureGenChart />
          </div>
        </div>

        {/* Card 3 */}
        <div className="relative bg-primary-foreground p-6 rounded-lg overflow-hidden">
          <CircleSlash2 className="absolute top-4 left-4 bg-red-500 text-white p-1 rounded-full w-10 h-10 z-10" />
          <div className="relative z-10 ml-16">
            <h1 className="text-base sm:text-lg md:text-xl font-semibold">Facture Impayées</h1>
            <p className="text-lg font-bold text-gray-800 dark:text-white mt-1">10 000,00 DA</p>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-8">
        <div className="bg-primary-foreground p-4 rounded-lg">
          <AppBarChart />
        </div>
        <div className="bg-primary-foreground p-4 rounded-lg">
          <AppPieChart />
        </div>
        <div className="bg-primary-foreground p-4 rounded-lg">
          <AppAreaChart />
        </div>
      </div>
    </div>
  )
}

export default Homepage
