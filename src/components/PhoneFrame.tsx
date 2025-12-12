import React from 'react';
import PhoneScreen, { type UseCase } from './PhoneScreen';

interface PhoneFrameProps {
    currentUseCase: UseCase;
    currentStep?: number;
}

const PhoneFrame: React.FC<PhoneFrameProps> = ({ currentUseCase, currentStep = -1 }) => {
    return (
        <div className="relative w-[300px] h-[600px] bg-gradient-to-br from-slate-900 via-black to-slate-950 rounded-[3rem] p-4 shadow-[0_20px_60px_rgba(0,255,136,0.15),0_0_0_1px_rgba(0,255,136,0.1),inset_0_1px_1px_rgba(255,255,255,0.05)] border-[6px] border-black/90 ring-1 ring-[#00FF88]/20 transform-gpu hover:scale-[1.02] hover:shadow-[0_25px_70px_rgba(0,255,136,0.25),0_0_0_1px_rgba(0,255,136,0.2)] transition-all duration-500">
            {/* Reflection/Glare Effect - Con toque verde */}
            <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-br from-[#00FF88]/5 via-transparent to-transparent pointer-events-none z-30"></div>
            
            {/* Inner Shadow for Depth */}
            <div className="absolute inset-4 rounded-[2.5rem] shadow-[inset_0_2px_8px_rgba(0,0,0,0.4),inset_0_0_20px_rgba(0,255,136,0.03)] pointer-events-none z-5"></div>

            {/* Notch - More realistic with gradient */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-gradient-to-b from-black to-slate-950 rounded-b-xl z-20 shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
                {/* Speaker Grille */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-1 bg-slate-700/50 rounded-full"></div>
                {/* Camera - Con acento verde */}
                <div className="absolute top-1.5 right-6 w-2 h-2 bg-slate-800 rounded-full ring-1 ring-[#00FF88]/30 shadow-[0_0_4px_rgba(0,255,136,0.2)]"></div>
            </div>

            {/* Side Buttons - More detailed con acento verde */}
            {/* Power Button */}
            <div className="absolute top-24 -right-[7px] w-[3px] h-16 bg-gradient-to-r from-slate-800 to-black rounded-r-md shadow-[2px_0_4px_rgba(0,255,136,0.15)]"></div>
            {/* Volume Up */}
            <div className="absolute top-24 -left-[7px] w-[3px] h-8 bg-gradient-to-l from-slate-800 to-black rounded-l-md shadow-[-2px_0_4px_rgba(0,255,136,0.15)]"></div>
            {/* Volume Down */}
            <div className="absolute top-36 -left-[7px] w-[3px] h-16 bg-gradient-to-l from-slate-800 to-black rounded-l-md shadow-[-2px_0_4px_rgba(0,255,136,0.15)]"></div>

            {/* Screen Content - Enhanced with screen glow verde */}
            <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden relative z-10 mx-auto shadow-[0_0_25px_rgba(0,255,136,0.15),inset_0_0_0_1px_rgba(0,0,0,0.1)]">
                {/* Screen Protector Shine Effect - Verde sutil */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#00FF88]/8 via-transparent to-transparent pointer-events-none z-50 mix-blend-overlay"></div>
                
                <PhoneScreen currentUseCase={currentUseCase} currentStep={currentStep} />
            </div>
        </div>
    );
};

export default PhoneFrame;
