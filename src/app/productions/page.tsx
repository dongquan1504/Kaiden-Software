import { DataTableDemo } from "@/components/section/basicTable";
import InfiniteTable from "@/components/section/dynamicTable";
// import TableDemo from "@/components/ui/table";

export default function Productions() {
  return (
    <>
      <h1>Productions</h1>
      <DataTableDemo />
      <InfiniteTable />
    </>
  );
}