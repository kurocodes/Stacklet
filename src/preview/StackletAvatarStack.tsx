import { profiles } from "../assets/assets";
import { Stacklet, useHoverDelay } from "../components/stacklet";

export default function StackletAvatarStack() {
  const { isHovered, bind } = useHoverDelay(140);

  return (
    <div className="w-screen h-screen bg-[#f1f1f1] flex items-center justify-start">
      <div className="m-10">
        <div className=" min-h-10 rounded-full" {...bind}>
          <Stacklet
            open={isHovered}
            direction="right"
            stackedFrom="start"
            align="forward"
            itemSize={40}
            scaleStep={0.08}
            opacityStep={0}
            collapsedSpacing={16}
            expandedSpacing={-8}
            transition={{
              type: "spring",
              stiffness: 350,
              damping: 20,
              mass: 1.4,
            }}
          >
            {profiles.map((profile) => (
              <Avatar key={profile.id} avatar={profile.avatar} />
            ))}
          </Stacklet>
        </div>
      </div>
    </div>
  );
}

function Avatar({ avatar }: { avatar: string }) {
  return (
    <div className="w-10 h-10 rounded-full shadow-[0_7px_29px_0_rgba(100,100,111,0.2)] overflow-hidden border-3 border-white">
      <img src={avatar} alt={avatar} />
    </div>
  );
}
