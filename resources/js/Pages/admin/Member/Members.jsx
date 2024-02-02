import TableMember from "@/Components/TableMember";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useState } from "react";

const Members = ({ auth, members }) => {
    return (
        <Authenticated user={auth.user}>
            <Head title="Members" />
            <TableMember data={members}/>
        </Authenticated>
    )
}

export default Members;