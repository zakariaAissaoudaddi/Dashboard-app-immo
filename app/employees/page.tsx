import {columns, Employees} from "./columns";
import { DataTable } from "./data-table";
const getData = async () : Promise <Employees[]>=> {
  return [
    {
         id: "728ed521",
         amount: 134,
         status: "pending",
         username: "John Doe",
         email: "johndoe@gmail.com",
    },
        {
         id: "728ed522",
         amount: 134,
         status: "pending",
         username: "zaki",
         email: "zaki@gmail.com",
    },
        {
         id: "728ed523",
         amount: 134,
         status: "pending",
         username: "omar",
         email: "omar@gmail.com",
    },
        {
         id: "728ed524",
         amount: 134,
         status: "pending",
         username: "kacem",
         email: "kacem@gmail.com",
    },
  ]
}


const EmployeesPage = async () => {
const data = await getData();
return <div className="mb-8 px-4 py-2 bg-secondary rounded-md">
        <div className="font-somibold">
          All Employee
        </div>
        <DataTable columns={columns} data={data}/>
     </div>;
};
export default EmployeesPage;