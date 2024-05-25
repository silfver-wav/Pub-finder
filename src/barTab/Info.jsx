import { FaGlobe, FaToilet } from "react-icons/fa";
import { PiWheelchairFill } from "react-icons/pi";
import { GrCheckmark } from "react-icons/gr";
import { RxCross1 } from "react-icons/rx";
import { ImSpinner2 } from "react-icons/im";
import { useGetAdditionalInfoQuery } from "../redux/slices/apiSlices/pubApiSlice";

export default function Info({ pub }) {

    const { data: info } = useGetAdditionalInfoQuery(pub.id);

    return (
        <div className="w-full">
            {
                info ?
                    <RenderInfo info={info} description={pub.description} />
                    :
                    <div className="flex justify-center items-center">
                        <ImSpinner2 className="animate-spin h-7 w-7" />
                    </div>
            }
        </div>
    );
}

const RenderInfo = ({ info, description }) => {
    return (
        <div
            className="relative flex flex-col rounded-xl bg-gray-900 bg-clip-border text-off_white shadow-lg my-2 cursor-pointer transition ease-in-out delay-150 focus:bg-gray-700 active:bg-gray-700 duration-200"
        >

            <p class="block font-oswald text-md antialiased font-light leading-relaxed text-white mb-3">
                {description}
            </p>

            <li class="flex items-center gap-4 text-white mb-1">
                <FaToilet size={18} />
                <p class="block font-oswald text-base font-200 leading-relaxed text-white antialiased" >
                    {info.washroom ?
                        <GrCheckmark size={17} />
                        :
                        <RxCross1 size={17} />
                    }
                </p>
            </li>

            {info.website &&
                <li class="flex items-center gap-4 text-white mb-1">
                    <FaGlobe size={16} />
                    <a
                        href={info.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        class="block font-oswald text-base font-200 leading-relaxed text-blue-500 antialiased hover:underline"
                    >
                        {info.website}
                    </a>
                </li>
            }

            <p className="flex">{info.outDoorSeating}</p>

            <li class="flex items-center gap-4 text-white mb-1">
                <PiWheelchairFill size={18} />
                <p class="block font-oswald text-base font-200 leading-relaxed text-white antialiased" >
                    Accessible Seating:
                    {info.accessibility.accessibleSeating ? ' Yes' : ' No'}
                </p>
            </li>

            <li class="flex items-center gap-4 text-white mb-1">
                <PiWheelchairFill size={18} />
                <p class="block font-oswald text-base font-200 leading-relaxed text-white antialiased" >
                    Accessible Entrance:
                    {info.accessibility.accessibleEntrance ? ' Yes' : ' No'}
                </p>
            </li>

            <li class="flex items-center gap-4 text-white mb-1">
                <PiWheelchairFill size={18} />
                <p class="block font-oswald text-base font-200 leading-relaxed text-white antialiased" >
                    Accessible Parking:
                    {info.accessibility.accessibleParking ? ' Yes' : ' No'}
                </p>
            </li>
        </div>
    );
}