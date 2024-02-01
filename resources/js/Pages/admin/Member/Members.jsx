import TableMember from "@/Components/TableMember";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useState } from "react";

const Members = ({ auth, members }) => {
    const [tablePage, setTablePage] = useState(1);
    return (
        <Authenticated user={auth.user} tablePage={tablePage}>
            <Head title="Members" />
            <TableMember data={members} setTablePage={setTablePage}/>
        </Authenticated>
    )
}

export default Members;