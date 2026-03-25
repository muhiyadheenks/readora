import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const AOVChart = ({ data }) => {
    return (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 h-[380px]">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
                Average Order Value
            </h2>

            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                        <XAxis
                            dataKey="date"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#9CA3AF', fontSize: 12 }}
                            dy={10}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#9CA3AF', fontSize: 12 }}
                        />
                        <Tooltip
                            cursor={{ fill: '#F3F4F6' }}
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        />
                        <Bar
                            dataKey="aov"
                            fill="#8884d8"
                            radius={[4, 4, 0, 0]}
                            barSize={30}
                        >
                            {/* Optional: if you want individual box colors or specific styling per cell */}
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill="#8884d8" fillOpacity={0.8} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};
export default AOVChart