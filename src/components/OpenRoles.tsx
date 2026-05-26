export type OpenRole = {
  _id: string;
  title: string;
  description: string;
  available: boolean;
  location: 'remote' | 'onsite';
};

export default function OpenRoles({ roles }: { roles: OpenRole[] }) {
  return (
    <div className="flex flex-col gap-4">
      {roles.map((role) => (
        <div key={role._id} className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className={`size-2 rounded-full shrink-0 ${role.available ? "bg-[#57E085]" : "bg-[#FF381E]"}`}
              />
              <span className="text-[#0c0c0c] text-sm font-medium leading-[1.6]">
                {role.title}
              </span>
            </div>
            <span className="bg-[#f5f5f5] rounded-full px-2 py-2 text-[#0c0c0c] text-sm leading-none">
              {role.location === 'onsite' ? 'On-site' : 'Remote'}
            </span>
          </div>
          <p className="text-[#7e7e7e] text-sm leading-[1.3]">
            {role.description}
          </p>
        </div>
      ))}
    </div>
  );
}
