import { FaGlobe, FaToilet } from "react-icons/fa";
import { RxAccessibility } from "react-icons/rx";
import { GrCheckmark } from "react-icons/gr";
import { RxCross1 } from "react-icons/rx";

export default function Info({ pub }) {

    return (
        <div className="w-full">
            

            <hr className="border-gray-300 mb-3" />

            <div className="flex mb-1">
                <FaToilet size={17} className="mr-2" />
                <p className="text-md text-left mb-1">
                {pub.washroom ? 
                    <GrCheckmark size={17} /> 
                    : 
                    <RxCross1 size={17} />
                }
                </p>
            </div>

            { pub.website && 
                <div className="flex mb-1">
                    <FaGlobe size={17} className="mr-2" />
                    <a 
                        href={pub.website} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-cyan-300 hover:text-cyan-400"
                    >
                    {pub.website}
                    </a>
                </div>
            }

            <p className="flex">{pub.outDoorSeating}</p>

            <div className="flex mb-1">
                <RxAccessibility size={17} className="mr-2" />
                <p className="text-md text-left">Accessible Seating: {pub.accessibility.accessibleSeating ? 'yes' : 'no'}</p>
            </div>
            <div className="flex mb-1">
                <RxAccessibility size={17} className="mr-2" />
                <p className="text-md text-left">
                    Accessible Entrance: {pub.accessibility.accessibleEntrance ? 'yes' : 'no'}</p>
            </div>
            <div className="flex mb-1">
                <RxAccessibility size={17} className="mr-2" />
                <p className="text-md text-left">Accessible Parking: {pub.accessibility.accessibleParking ? 'yes' : 'no'}</p>
            </div>
        </div>
    );
}