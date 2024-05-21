import { FaGlobe, FaToilet } from "react-icons/fa";
import { RxAccessibility } from "react-icons/rx";
import { GrCheckmark } from "react-icons/gr";
import { RxCross1 } from "react-icons/rx";
import { useGetAdditionalInfoQuery } from "../redux/slices/apiSlices/pubApiSlice";

export default function Info({ pub }) {

    const { data: info } = useGetAdditionalInfoQuery(pub.id);

    console.log(info)

    return (
        <div className="w-full">
            {
                info ?
                    <RenderInfo info={info} />
                    :
                    <p>Loading</p>
            }
        </div>
    );
}


const RenderInfo = ({ info }) => {
    return (
        <>
            <hr className="border-gray-300 mb-3" />

            <div className="flex mb-1">
                <FaToilet size={17} className="mr-2" />
                <p className="text-md text-left mb-1">
                    {info.washroom ?
                        <GrCheckmark size={17} />
                        :
                        <RxCross1 size={17} />
                    }
                </p>
            </div>

            {info.website &&
                <div className="flex mb-1">
                    <FaGlobe size={17} className="mr-2" />
                    <a
                        href={info.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cyan-300 hover:text-cyan-400"
                    >
                        {info.website}
                    </a>
                </div>
            }

            <p className="flex">{info.outDoorSeating}</p>

            <div className="flex mb-1">
                <RxAccessibility size={17} className="mr-2" />
                <p className="text-md text-left">Accessible Seating: {info.accessibility.accessibleSeating ? 'yes' : 'no'}</p>
            </div>
            <div className="flex mb-1">
                <RxAccessibility size={17} className="mr-2" />
                <p className="text-md text-left">
                    Accessible Entrance: {info.accessibility.accessibleEntrance ? 'yes' : 'no'}</p>
            </div>
            <div className="flex mb-1">
                <RxAccessibility size={17} className="mr-2" />
                <p className="text-md text-left">Accessible Parking: {info.accessibility.accessibleParking ? 'yes' : 'no'}</p>
            </div>
        </>
    );
}