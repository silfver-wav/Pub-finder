import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchVisitedPubs } from "../redux/slices/pubsSlice";
import BarTab from "../sideBar/BarTab";

export default function VisitedPubs() {
    const dispatch = useDispatch();
    let visitedPubs = useSelector((state) => state.pubs.visitedPubs)

    useEffect(() => {
        console.log(visitedPubs)
        if (visitedPubs.length == 0 ) {
            dispatch(fetchVisitedPubs());
        }
    });

    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' };
        return date.toLocaleString(undefined, options);
    };

    return (
        <div className="absolute inset-0 z-40 w-full h-full bg-slate-400 ml">
            <div className="ml-20 mt-20">
                { visitedPubs.map((pub) => (
                    <div>
                        <BarTab key={pub.id} pub={pub.pubDTO}/>
                        <p>You visited this pub: {formatTimestamp(pub.visitedDate)}</p>
                    </div>
                ))}
            </div>

        </div>
    )
}