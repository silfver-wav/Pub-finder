import { useGetVisitedPubsQuery } from "../redux/slices/apiSlices/pubApiSlice";
import BarTab from "../barTab/BarTab";
import { skipToken } from "@reduxjs/toolkit/query";
import DropdownMenu from "../DropdownMenu";
import "../searchBar/SearchResults.css"

export default function VisitedPubs() {
    const user = localStorage.getItem("user");
    const { data: visitedPubs, isSuccess } = useGetVisitedPubsQuery(user ? user : skipToken)

    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' };
        return date.toLocaleString(undefined, options);
    };

    console.log(visitedPubs)

    return (
        <div className="bg-black overflow-y-auto h-full">
            <DropdownMenu />
            <h2 className="mb-5 text-center text-4xl font-bold tracking-tight text-white pt-10">Vistied Pubs</h2>
            <div className="ml-4 mr-4 mt-10 grid grid-cols-4 gap-4 bg-slate-800">
                { isSuccess && visitedPubs.map((pub) => (
                    <div className="flex justify-center bg-slate-900 rounded-lg">
                        <div className="w-full">
                            <BarTab key={pub.id} pub={pub.pubDto} user={user} visited={true} refetch={null} />
                            <p className="text-white">You visited this pub: {formatTimestamp(pub.visitedDate)}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}