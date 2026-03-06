const DabuduSection = () => {
    return (
        <aside className="lg:col-span-4 h-full">
            <section
                aria-label="Dabudu.com English learning"
                className="relative h-full"
            >
                <div className="relative mt-10 rounded-3xl bg-[#f5f8ff] h-[88%] shadow-sm border border-[#e3ebff] px-6 pt-12 pb-10 flex flex-col gap-6">
                    {/* Pill header */}
                    <div className="absolute -top-7 left-1/2 -translate-x-1/2">
                        <div className="px-10 py-4 rounded-full bg-[#4364f7] text-white sm:text-3xl text-2xl font-extrabold shadow-md">
                            Dabudu.com
                        </div>
                    </div>

                    <div className="mt-2 space-y-3">
                        <h2 className="text-xl font-semibold text-[#324c7f]">
                            ისწავლე და იმუშავე ონლაინ
                        </h2>
                    </div>

                    <ul className="space-y-3 text-[15px] text-[#3b4a6a]">
                        <li className="flex items-start gap-2">
                            <span className="mt-1 h-2 w-2 rounded-full bg-[#19c46b]" />
                            <span>ინგლისური ენის შესწავლა</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="mt-1 h-2 w-2 rounded-full bg-[#19c46b]" />
                            <span>დასაქმება დისტანციურად</span>
                        </li>
                    </ul>
                </div>
            </section>
        </aside>
    )
}
export default DabuduSection;