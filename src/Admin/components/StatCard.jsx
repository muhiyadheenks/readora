import { Link } from "react-router-dom"

const StatCard = ({ title, value, icon, to }) => {
    return (
        <Link to={to}>

            <div className="bg-white p-5 rounded-xl shadow flex items-center gap-4">
                <div className="text-2xl text-indigo-600">
                    {icon}
                </div>
                <div>
                    <p className="text-sm text-gray-500">{title}</p>
                    <h3 className="text-xl font-semibold text-gray-800">
                        {value}
                    </h3>
                </div>
            </div>
        </Link>
    )
}
export default StatCard