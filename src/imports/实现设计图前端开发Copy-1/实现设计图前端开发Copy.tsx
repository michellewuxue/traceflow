import svgPaths from "./svg-m1d1k1q1v7";

function Icon() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d={svgPaths.pb47f400} id="Vector" stroke="var(--stroke-0, #1ABC9C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p17a13100} id="Vector_2" stroke="var(--stroke-0, #1ABC9C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M9 15L11 17L15 13" id="Vector_3" stroke="var(--stroke-0, #1ABC9C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Heading() {
  return (
    <div className="h-[32px] relative shrink-0 w-[140.406px]" data-name="Heading 1">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold','Noto_Sans_JP:Bold',sans-serif] font-bold leading-[32px] left-0 not-italic text-[#171a1f] text-[24px] top-0 tracking-[-0.5297px] whitespace-nowrap">撰写工作日志</p>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex gap-[8px] h-[32px] items-center relative shrink-0 w-full" data-name="Container">
      <Icon />
      <Heading />
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular','Noto_Sans_SC:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[#565d6d] text-[16px] top-[-0.5px] tracking-[-0.3125px] whitespace-nowrap">结构化记录每日工作，方便团队同步与月底总结。</p>
    </div>
  );
}

function Container2() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[8px] h-[64px] items-start left-[24px] top-[24px] w-[352px]" data-name="Container">
      <Container3 />
      <Paragraph />
    </div>
  );
}

function Text() {
  return (
    <div className="flex-[80_0_0] h-[20px] min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#171a1f] text-[14px] top-[0.5px] tracking-[-0.1504px] whitespace-nowrap">2026/04/13</p>
      </div>
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M5.33333 1.33333V4" id="Vector" stroke="var(--stroke-0, #565D6D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M10.6667 1.33333V4" id="Vector_2" stroke="var(--stroke-0, #565D6D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p3ee34580} id="Vector_3" stroke="var(--stroke-0, #565D6D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M2 6.66667H14" id="Vector_4" stroke="var(--stroke-0, #565D6D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="absolute bg-white content-stretch flex gap-[12px] h-[43px] items-center left-[738px] px-[13px] py-px rounded-[8px] top-[24px] w-[134px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#dee1e6] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Text />
      <Icon1 />
    </div>
  );
}

function Container1() {
  return (
    <div className="h-[112px] relative shrink-0 w-full" data-name="Container">
      <Container2 />
      <Button />
    </div>
  );
}

function Header() {
  return (
    <div className="bg-white content-stretch flex flex-col h-[111px] items-start pb-px relative shrink-0 w-full" data-name="Header">
      <div aria-hidden="true" className="absolute border-[rgba(243,244,246,0.4)] border-b border-solid inset-0 pointer-events-none" />
      <Container1 />
    </div>
  );
}

function Heading1() {
  return (
    <div className="h-[28px] relative shrink-0 w-[120px]" data-name="Heading 2">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold','Noto_Sans_JP:Bold','Noto_Sans_SC:Bold',sans-serif] font-bold leading-[28px] left-0 not-italic text-[#323232] text-[20px] top-0 tracking-[-0.4492px] whitespace-nowrap">工作事项列表</p>
      </div>
    </div>
  );
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M3.33333 8H12.6667" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M8 3.33333V12.6667" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Text1() {
  return (
    <div className="flex-[1_0_0] h-[20px] min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Medium','Noto_Sans_JP:Medium','Noto_Sans_SC:Medium',sans-serif] font-medium leading-[20px] left-[28px] not-italic text-[14px] text-center text-white top-[0.5px] tracking-[-0.1504px] whitespace-nowrap">添加事项</p>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[#1abc9c] h-[40px] relative rounded-[8px] shrink-0 w-[112px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center px-[16px] relative size-full">
        <Icon2 />
        <Text1 />
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="h-[77px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#dee1e6] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pb-[19px] pt-[18px] px-[20px] relative size-full">
          <Heading1 />
          <Button1 />
        </div>
      </div>
    </div>
  );
}

function Icon3() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[45.83%_58.33%_45.83%_33.33%]" data-name="Vector">
        <div className="absolute inset-[-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.66667 2.66667">
            <path d={svgPaths.p23ccba00} id="Vector" stroke="var(--stroke-0, #1ABC9C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-3/4 left-[33.33%] right-[58.33%] top-[16.67%]" data-name="Vector">
        <div className="absolute inset-[-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.66667 2.66667">
            <path d={svgPaths.p23ccba00} id="Vector" stroke="var(--stroke-0, #1ABC9C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[16.67%] left-[33.33%] right-[58.33%] top-3/4" data-name="Vector">
        <div className="absolute inset-[-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.66667 2.66667">
            <path d={svgPaths.p23ccba00} id="Vector" stroke="var(--stroke-0, #1ABC9C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[45.83%_33.33%_45.83%_58.33%]" data-name="Vector">
        <div className="absolute inset-[-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.66667 2.66667">
            <path d={svgPaths.p23ccba00} id="Vector" stroke="var(--stroke-0, #1ABC9C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-3/4 left-[58.33%] right-[33.33%] top-[16.67%]" data-name="Vector">
        <div className="absolute inset-[-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.66667 2.66667">
            <path d={svgPaths.p23ccba00} id="Vector" stroke="var(--stroke-0, #1ABC9C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[16.67%] left-[58.33%] right-[33.33%] top-3/4" data-name="Vector">
        <div className="absolute inset-[-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.66667 2.66667">
            <path d={svgPaths.p23ccba00} id="Vector" stroke="var(--stroke-0, #1ABC9C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[16px] size-[16px] top-[15.5px]" data-name="Container">
      <Icon3 />
    </div>
  );
}

function Container9() {
  return (
    <div className="absolute bg-[rgba(26,188,156,0.2)] h-[30px] left-[44px] rounded-[4px] top-[8.5px] w-[56.945px]" data-name="Container">
      <p className="absolute font-['Inter:Bold','Noto_Sans_JP:Bold','Noto_Sans_SC:Bold',sans-serif] font-bold leading-[0] left-[8px] not-italic text-[#1abc9c] text-[0px] top-[1.5px] tracking-[-0.3125px] whitespace-nowrap">
        <span className="leading-[26px] text-[16px]">事项</span>
        <span className="font-['Inter:Regular','Noto_Sans_JP:Bold','Noto_Sans_SC:Bold',sans-serif] font-normal leading-[16px] text-[12px]">{` 1`}</span>
      </p>
    </div>
  );
}

function Icon4() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M2 4H14" id="Vector" stroke="var(--stroke-0, #171A1F)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p64eb800} id="Vector_2" stroke="var(--stroke-0, #171A1F)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p56ef700} id="Vector_3" stroke="var(--stroke-0, #171A1F)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M6.66667 7.33333V11.3333" id="Vector_4" stroke="var(--stroke-0, #171A1F)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M9.33333 7.33333V11.3333" id="Vector_5" stroke="var(--stroke-0, #171A1F)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button2() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[778px] px-[8px] rounded-[8px] size-[32px] top-[7.5px]" data-name="Button">
      <Icon4 />
    </div>
  );
}

function Icon5() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M12 10L8 6L4 10" id="Vector" stroke="var(--stroke-0, #171A1F)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button3() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[814px] px-[8px] rounded-[8px] size-[32px] top-[7.5px]" data-name="Button">
      <Icon5 />
    </div>
  );
}

function Container7() {
  return (
    <div className="bg-[#e8f5f1] h-[48px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[rgba(224,224,224,0.3)] border-b border-solid inset-0 pointer-events-none" />
      <Container8 />
      <Container9 />
      <Button2 />
      <Button3 />
    </div>
  );
}

function Label() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Label">
      <p className="absolute font-['Inter:Medium','Noto_Sans_JP:Medium','Noto_Sans_SC:Medium',sans-serif] font-medium leading-[0] left-0 not-italic text-[#171a1f] text-[14px] top-[0.5px] tracking-[-0.1504px] whitespace-nowrap">
        <span className="leading-[20px]">{`工作事项名称 `}</span>
        <span className="leading-[20px] text-[#fb2c36]">*</span>
      </p>
    </div>
  );
}

function TextInput() {
  return (
    <div className="absolute h-[36px] left-0 rounded-[8px] top-0 w-[830px]" data-name="Text Input">
      <div className="content-stretch flex items-center overflow-clip pl-[12px] pr-[80px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Regular','Noto_Sans_SC:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[14px] text-[rgba(10,10,10,0.5)] tracking-[-0.1504px] whitespace-nowrap">选择或搜索分类...</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#dee1e6] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Icon6() {
  return (
    <div className="flex-[1_0_0] h-[16px] min-w-px relative" data-name="Icon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <div className="absolute inset-[12.5%_20.83%_20.83%_12.5%]" data-name="Vector">
          <div className="absolute inset-[-6.25%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
              <path d={svgPaths.p1b38bb40} id="Vector" stroke="var(--stroke-0, #565D6D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
            </svg>
          </div>
        </div>
        <div className="absolute inset-[69.58%_12.5%_12.5%_69.58%]" data-name="Vector">
          <div className="absolute inset-[-23.26%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.2 4.2">
              <path d={svgPaths.p3195c6c0} id="Vector" stroke="var(--stroke-0, #565D6D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="absolute content-stretch flex items-center left-[806px] size-[16px] top-[10px]" data-name="Container">
      <Icon6 />
    </div>
  );
}

function CategorySelector() {
  return (
    <div className="h-[36px] relative shrink-0 w-full" data-name="CategorySelector">
      <TextInput />
      <Container12 />
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[64px] items-start relative shrink-0 w-full" data-name="Container">
      <Label />
      <CategorySelector />
    </div>
  );
}

function Label1() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Label">
      <p className="absolute font-['Inter:Medium','Noto_Sans_JP:Medium',sans-serif] font-medium leading-[0] left-0 not-italic text-[#171a1f] text-[14px] top-[0.5px] tracking-[-0.1504px] whitespace-nowrap">
        <span className="leading-[20px]">{`工作描述 `}</span>
        <span className="leading-[20px] text-[#fb2c36]">*</span>
      </p>
    </div>
  );
}

function Icon7() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-[16.67%] left-1/4 right-[20.83%] top-[16.67%]" data-name="Vector">
        <div className="absolute inset-[-6.25%_-7.69%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 12">
            <path d={svgPaths.p36e30a00} id="Vector" stroke="var(--stroke-0, #1ABC9C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button4() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[8px] pt-[6px] px-[6px] rounded-[4px] size-[28px] top-[6px]" data-name="Button">
      <Icon7 />
    </div>
  );
}

function Icon8() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[16.67%_20.83%_83.33%_41.67%]" data-name="Vector">
        <div className="absolute inset-[-0.67px_-11.11%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.33333 1.33333">
            <path d="M6.66667 0.666667H0.666667" id="Vector" stroke="var(--stroke-0, #565D6D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[83.33%_41.67%_16.67%_20.83%]" data-name="Vector">
        <div className="absolute inset-[-0.67px_-11.11%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.33333 1.33333">
            <path d="M6.66667 0.666667H0.666667" id="Vector" stroke="var(--stroke-0, #565D6D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[16.67%_37.5%]" data-name="Vector">
        <div className="absolute inset-[-6.25%_-16.67%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.33369 12.0004">
            <path d={svgPaths.p2cdaf460} id="Vector" stroke="var(--stroke-0, #565D6D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button5() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[40px] pt-[6px] px-[6px] rounded-[4px] size-[28px] top-[6px]" data-name="Button">
      <Icon8 />
    </div>
  );
}

function Icon9() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-[33.33%] left-1/4 right-1/4 top-[16.67%]" data-name="Vector">
        <div className="absolute inset-[-8.33%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.33333 9.33333">
            <path d={svgPaths.pf781a80} id="Vector" stroke="var(--stroke-0, #565D6D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[83.33%_16.67%_16.67%_16.67%]" data-name="Vector">
        <div className="absolute inset-[-0.67px_-6.25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 1.33333">
            <path d="M0.666667 0.666667H11.3333" id="Vector" stroke="var(--stroke-0, #565D6D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button6() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[72px] pt-[6px] px-[6px] rounded-[4px] size-[28px] top-[6px]" data-name="Button">
      <Icon9 />
    </div>
  );
}

function Container15() {
  return <div className="absolute bg-[#dee1e6] h-[20px] left-[108px] top-[10px] w-px" data-name="Container" />;
}

function Icon10() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-1/2 left-[12.5%] right-[87.46%] top-1/2" data-name="Vector">
        <div className="absolute inset-[-0.67px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.34 1.33333">
            <path d="M0.666667 0.666667H0.673333" id="Vector" stroke="var(--stroke-0, #565D6D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-1/4 left-[12.5%] right-[87.46%] top-3/4" data-name="Vector">
        <div className="absolute inset-[-0.67px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.34 1.33333">
            <path d="M0.666667 0.666667H0.673333" id="Vector" stroke="var(--stroke-0, #565D6D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-3/4 left-[12.5%] right-[87.46%] top-1/4" data-name="Vector">
        <div className="absolute inset-[-0.67px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.34 1.33333">
            <path d="M0.666667 0.666667H0.673333" id="Vector" stroke="var(--stroke-0, #565D6D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-1/2 left-[33.33%] right-[12.5%] top-1/2" data-name="Vector">
        <div className="absolute inset-[-0.67px_-7.69%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 1.33333">
            <path d="M0.666667 0.666667H9.33333" id="Vector" stroke="var(--stroke-0, #565D6D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-1/4 left-[33.33%] right-[12.5%] top-3/4" data-name="Vector">
        <div className="absolute inset-[-0.67px_-7.69%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 1.33333">
            <path d="M0.666667 0.666667H9.33333" id="Vector" stroke="var(--stroke-0, #565D6D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-3/4 left-[33.33%] right-[12.5%] top-1/4" data-name="Vector">
        <div className="absolute inset-[-0.67px_-7.69%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 1.33333">
            <path d="M0.666667 0.666667H9.33333" id="Vector" stroke="var(--stroke-0, #565D6D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button7() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[117px] pt-[6px] px-[6px] rounded-[4px] size-[28px] top-[6px]" data-name="Button">
      <Icon10 />
    </div>
  );
}

function Icon11() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-1/2 left-[41.67%] right-[12.5%] top-1/2" data-name="Vector">
        <div className="absolute inset-[-0.67px_-9.09%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.66667 1.33333">
            <path d="M0.666667 0.666667H8" id="Vector" stroke="var(--stroke-0, #565D6D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-1/4 left-[41.67%] right-[12.5%] top-3/4" data-name="Vector">
        <div className="absolute inset-[-0.67px_-9.09%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.66667 1.33333">
            <path d="M0.666667 0.666667H8" id="Vector" stroke="var(--stroke-0, #565D6D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-3/4 left-[41.67%] right-[12.5%] top-1/4" data-name="Vector">
        <div className="absolute inset-[-0.67px_-9.09%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.66667 1.33333">
            <path d="M0.666667 0.666667H8" id="Vector" stroke="var(--stroke-0, #565D6D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[58.33%] left-[16.67%] right-3/4 top-[41.67%]" data-name="Vector">
        <div className="absolute inset-[-0.67px_-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.66667 1.33333">
            <path d="M0.666667 0.666667H2" id="Vector" stroke="var(--stroke-0, #565D6D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[58.33%] left-[16.67%] right-[79.17%] top-1/4" data-name="Vector">
        <div className="absolute inset-[-25%_-100%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 4">
            <path d={svgPaths.p39273870} id="Vector" stroke="var(--stroke-0, #565D6D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-1/4 left-[16.67%] right-3/4 top-[57.52%]" data-name="Vector">
        <div className="absolute inset-[-23.83%_-50%_-23.83%_-50.01%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.66681 4.13083">
            <path d={svgPaths.p2cce7ad0} id="Vector" stroke="var(--stroke-0, #565D6D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button8() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[149px] pt-[6px] px-[6px] rounded-[4px] size-[28px] top-[6px]" data-name="Button">
      <Icon11 />
    </div>
  );
}

function Container16() {
  return <div className="absolute bg-[#dee1e6] h-[20px] left-[185px] top-[10px] w-px" data-name="Container" />;
}

function Icon12() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[8.61%_8.57%_37.48%_41.67%]" data-name="Vector">
        <div className="absolute inset-[-7.73%_-8.37%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.29575 9.95911">
            <path d={svgPaths.p3fda2140} id="Vector" stroke="var(--stroke-0, #565D6D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[37.48%_41.67%_8.61%_8.57%]" data-name="Vector">
        <div className="absolute inset-[-7.73%_-8.37%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.29575 9.95911">
            <path d={svgPaths.p1b1f280} id="Vector" stroke="var(--stroke-0, #565D6D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button9() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[194px] pt-[6px] px-[6px] rounded-[4px] size-[28px] top-[6px]" data-name="Button">
      <Icon12 />
    </div>
  );
}

function Container14() {
  return (
    <div className="bg-white h-[41px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#dee1e6] border-b border-solid inset-0 pointer-events-none" />
      <Button4 />
      <Button5 />
      <Button6 />
      <Container15 />
      <Button7 />
      <Button8 />
      <Container16 />
      <Button9 />
    </div>
  );
}

function Container17() {
  return (
    <div className="h-[96px] relative shrink-0 w-full" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start pt-[12px] px-[12px] relative size-full">
          <p className="font-['Inter:Regular','Noto_Sans_JP:Regular','Noto_Sans_SC:Regular',sans-serif] font-normal h-[48px] leading-[24px] not-italic relative shrink-0 text-[#171a1f] text-[14px] tracking-[-0.1504px] w-full">1. 完成了日志撰写页面的前端组件开发，包括富文本编辑和拖拽模块，待完善接续等功能。 2. 与后端确认了日志提交的 API 调用方式。 3. 接受了客服反馈记录小程序下划到最后的问题。</p>
        </div>
      </div>
    </div>
  );
}

function RichTextEditor() {
  return (
    <div className="bg-white h-[139px] relative rounded-[8px] shrink-0 w-full" data-name="RichTextEditor">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-px relative size-full">
          <Container14 />
          <Container17 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#dee1e6] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[167px] items-start relative shrink-0 w-full" data-name="Container">
      <Label1 />
      <RichTextEditor />
    </div>
  );
}

function Label2() {
  return (
    <div className="absolute h-[20px] left-0 top-0 w-[830px]" data-name="Label">
      <p className="absolute font-['Inter:Medium','Noto_Sans_JP:Medium','Noto_Sans_SC:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#171a1f] text-[14px] top-[0.5px] tracking-[-0.1504px] whitespace-nowrap">交付结果</p>
    </div>
  );
}

function Icon13() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M8.82267 13.5013L14 8.2" id="Vector" stroke="var(--stroke-0, #1ABC9C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p29e0c2c0} id="Vector_2" stroke="var(--stroke-0, #1ABC9C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Text2() {
  return (
    <div className="flex-[1_0_0] h-[20px] min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Medium','Noto_Sans_JP:Medium','Noto_Sans_SC:Medium',sans-serif] font-medium leading-[20px] left-[28px] not-italic text-[#1abc9c] text-[14px] text-center top-[0.5px] tracking-[-0.1504px] whitespace-nowrap">上传文件</p>
      </div>
    </div>
  );
}

function Button10() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[36px] items-center left-[714px] px-[18px] py-[2px] rounded-[8px] top-0 w-[116px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(26,188,156,0.4)] border-dashed inset-0 pointer-events-none rounded-[8px]" />
      <Icon13 />
      <Text2 />
    </div>
  );
}

function TextInput1() {
  return (
    <div className="absolute h-[36px] left-0 rounded-[8px] top-0 w-[706px]" data-name="Text Input">
      <div className="content-stretch flex items-center overflow-clip pl-[36px] pr-[12px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Regular','Noto_Sans_SC:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[14px] text-[rgba(86,93,109,0.5)] tracking-[-0.1504px] whitespace-nowrap">输入链接地址...</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#dee1e6] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Icon14() {
  return (
    <div className="absolute left-[12px] size-[16px] top-[10px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_51_292)" id="Icon">
          <path d={svgPaths.p17915680} id="Vector" stroke="var(--stroke-0, #565D6D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p294d5f00} id="Vector_2" stroke="var(--stroke-0, #565D6D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_51_292">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container19() {
  return (
    <div className="absolute h-[36px] left-0 top-0 w-[706px]" data-name="Container">
      <TextInput1 />
      <Icon14 />
    </div>
  );
}

function Container18() {
  return (
    <div className="absolute h-[36px] left-0 top-[28px] w-[830px]" data-name="Container">
      <Button10 />
      <Container19 />
    </div>
  );
}

function Icon15() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p19d57600} id="Vector" stroke="var(--stroke-0, #EC4899)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p2fe1fe40} id="Vector_2" stroke="var(--stroke-0, #EC4899)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p2c494540} id="Vector_3" stroke="var(--stroke-0, #EC4899)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Text3() {
  return (
    <div className="bg-white flex-[1_0_0] h-[22px] min-w-px relative rounded-[4px]" data-name="Text">
      <div aria-hidden="true" className="absolute border border-[#ec4899] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium','Noto_Sans_SC:Medium','Noto_Sans_JP:Medium',sans-serif] font-medium leading-[16px] left-[7px] not-italic text-[#ec4899] text-[12px] top-[4px] whitespace-nowrap">设计稿</p>
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="h-[22px] relative shrink-0 w-[74px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Icon15 />
        <Text3 />
      </div>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular','Noto_Sans_SC:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#171a1f] text-[14px] top-[0.5px] tracking-[-0.1504px] whitespace-nowrap">设计稿_v2.png</p>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[#9ca3af] text-[12px] top-px whitespace-nowrap">2.4 MB</p>
    </div>
  );
}

function Container22() {
  return (
    <div className="flex-[654_0_0] h-[36px] min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Paragraph1 />
        <Paragraph2 />
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="absolute bg-[#f9f9f9] content-stretch flex gap-[12px] h-[58px] items-center left-0 pl-[11px] pr-[79px] py-[11px] rounded-[8px] top-[76px] w-[830px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#dee1e6] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Container21 />
      <Container22 />
    </div>
  );
}

function FileUploadSection() {
  return (
    <div className="h-[134px] relative shrink-0 w-full" data-name="FileUploadSection">
      <Label2 />
      <Container18 />
      <Container20 />
    </div>
  );
}

function Container10() {
  return (
    <div className="h-[429px] relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col gap-[16px] items-start pt-[16px] px-[16px] relative size-full">
        <Container11 />
        <Container13 />
        <FileUploadSection />
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex flex-col h-[477px] items-start relative shrink-0 w-full" data-name="Container">
      <Container7 />
      <Container10 />
    </div>
  );
}

function WorkItemsList() {
  return (
    <div className="bg-white h-[556px] relative rounded-[10px] shrink-0 w-full" data-name="WorkItemsList">
      <div aria-hidden="true" className="absolute border border-[#e0e0e0] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="content-stretch flex flex-col items-start p-px relative size-full">
        <Container5 />
        <Container6 />
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="bg-white h-[588px] relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start pt-[16px] px-[16px] relative size-full">
        <WorkItemsList />
      </div>
    </div>
  );
}

function Icon16() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_51_280)" id="Icon">
          <path d={svgPaths.p39ee6532} id="Vector" stroke="var(--stroke-0, #565D6D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M8 10.6667V8" id="Vector_2" stroke="var(--stroke-0, #565D6D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M8 5.33333H8.00667" id="Vector_3" stroke="var(--stroke-0, #565D6D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_51_280">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Heading2() {
  return (
    <div className="h-[20px] relative shrink-0 w-[56px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium','Noto_Sans_JP:Medium','Noto_Sans_SC:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#171a1f] text-[14px] top-[0.5px] tracking-[-0.1504px] whitespace-nowrap">重点说明</p>
      </div>
    </div>
  );
}

function Container24() {
  return (
    <div className="content-stretch flex gap-[8px] h-[20px] items-center relative shrink-0 w-full" data-name="Container">
      <Icon16 />
      <Heading2 />
    </div>
  );
}

function TextInput2() {
  return (
    <div className="h-[36px] relative shrink-0 w-full" data-name="Text Input">
      <div className="content-stretch flex items-center overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Inter:Regular','Noto_Sans_JP:Regular','Noto_Sans_SC:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#9ca3af] text-[14px] tracking-[-0.1504px] whitespace-nowrap">需要明天继续完善拖拽功能的兼容性，确保跨协助的稳定性...</p>
      </div>
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0)] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container23() {
  return (
    <div className="bg-white h-[102px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#dee1e6] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="content-stretch flex flex-col gap-[12px] items-start pb-px pt-[17px] px-[17px] relative size-full">
        <Container24 />
        <TextInput2 />
      </div>
    </div>
  );
}

function ImportantNotes() {
  return (
    <div className="h-[118px] relative shrink-0 w-full" data-name="ImportantNotes">
      <div className="content-stretch flex flex-col items-start px-[16px] relative size-full">
        <Container23 />
      </div>
    </div>
  );
}

function Button11() {
  return (
    <div className="bg-white h-[44px] relative rounded-[8px] shrink-0 w-[94px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#dee1e6] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Medium','Noto_Sans_JP:Medium',sans-serif] font-medium leading-[20px] left-[47px] not-italic text-[#171a1f] text-[14px] text-center top-[12.5px] tracking-[-0.1504px] whitespace-nowrap">取消</p>
      </div>
    </div>
  );
}

function Icon17() {
  return (
    <div className="absolute left-[24px] size-[14px] top-[15px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g clipPath="url(#clip0_51_247)" id="Icon">
          <path d={svgPaths.p3fccf600} id="Vector" stroke="var(--stroke-0, #19191F)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p3bf11880} id="Vector_2" stroke="var(--stroke-0, #19191F)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
        <defs>
          <clipPath id="clip0_51_247">
            <rect fill="white" height="14" width="14" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button12() {
  return (
    <div className="bg-[#1abc9c] flex-[1_0_0] h-[44px] min-w-px relative rounded-[8px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Icon17 />
        <p className="-translate-x-1/2 absolute font-['Inter:Medium','Noto_Sans_SC:Medium','Noto_Sans_JP:Medium',sans-serif] font-medium leading-[20px] left-[74px] not-italic text-[#19191f] text-[14px] text-center top-[12.5px] tracking-[-0.1504px] whitespace-nowrap">发布日志</p>
      </div>
    </div>
  );
}

function Container25() {
  return (
    <div className="content-stretch flex gap-[628px] h-[44px] items-center relative shrink-0 w-full" data-name="Container">
      <Button11 />
      <Button12 />
    </div>
  );
}

function Footer() {
  return (
    <div className="bg-[rgba(243,244,246,0.2)] h-[93px] relative shrink-0 w-full" data-name="Footer">
      <div aria-hidden="true" className="absolute border-[rgba(243,244,246,0.4)] border-solid border-t inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col items-start pt-[25px] px-[24px] relative size-full">
        <Container25 />
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="bg-white h-[910px] relative rounded-[10px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] shrink-0 w-[896px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <Header />
        <Container4 />
        <ImportantNotes />
        <Footer />
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="bg-[#fafafa] h-[974px] relative shrink-0 w-full" data-name="App">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center px-[102.5px] py-[32px] relative size-full">
          <Container />
        </div>
      </div>
    </div>
  );
}

function Body() {
  return (
    <div className="content-stretch flex flex-col h-[832px] items-start relative shrink-0 w-full" data-name="Body">
      <App />
    </div>
  );
}

export default function Copy() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative size-full" data-name="实现设计图前端开发 (Copy)">
      <Body />
    </div>
  );
}