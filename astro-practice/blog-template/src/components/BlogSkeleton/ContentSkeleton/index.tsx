const INTRO_LINES = ['intro-0', 'intro-1', 'intro-2', 'intro-3'];
const SECTION_IDS = ['section-0', 'section-1', 'section-2', 'section-3'];
const BULLET_IDS = ['bullet-0', 'bullet-1', 'bullet-2'];
const CONCLUSION_LINES = ['conclusion-0', 'conclusion-1', 'conclusion-2'];

const ContentSkeleton = () => {
  return (
    <div className="mt-8">
      <div className="mb-10 space-y-4">
        {INTRO_LINES.map((id) => (
          <div key={id} className="h-4 w-full rounded bg-gray-100" />
        ))}
      </div>
      <div className="mb-8 w-full overflow-hidden rounded-2xl lg:mb-12">
        <div className="h-[206px] w-full rounded-2xl bg-gray-200 lg:h-[405px]" />
      </div>
      <div className="mb-3 lg:px-10">
        <div className="my-[52px] h-5 w-full max-w-xl rounded bg-gray-200" />
        <div className="space-y-8">
          {SECTION_IDS.map((sectionId) => (
            <div key={sectionId} className="space-y-3">
              <div className="h-5 w-full max-w-lg rounded bg-gray-200" />
              <div className="space-y-2">
                {BULLET_IDS.map((bulletId) => (
                  <div key={`${sectionId}-${bulletId}`} className="flex gap-3">
                    <div className="mt-2 h-2.5 w-2.5 flex-shrink-0 rounded-full bg-gray-300" />
                    <div className="h-4 w-full rounded bg-gray-100" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 space-y-3">
          <div className="h-5 w-32 rounded bg-gray-200" />
          {CONCLUSION_LINES.map((id) => (
            <div key={id} className="h-4 w-full rounded bg-gray-100" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContentSkeleton;
