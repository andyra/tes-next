import Image from "next/image";
import ChordSheetJS from "chordsheetjs";

const LeadSheet = ({ className, song }) => {
  const { leadSheet, notation } = song;
  const parser = new ChordSheetJS.ChordProParser();
  const formatter = new ChordSheetJS.HtmlDivFormatter();
  const parsedLeadSheet = parser.parse(leadSheet);
  const formattedLeadSheet = formatter.format(parsedLeadSheet);

  return (
    <section className="space-y-16 lg:border-2 lg:rounded-xl lg:p-48 lg:shadow-lg xl:p-48 break-inside-auto lead-sheet">
      <h2 className="hidden font-bold text-xl print:block print:text-2xl print:mb-0">
        {song.title}
      </h2>
      {leadSheet && (
        <div
          className={className}
          dangerouslySetInnerHTML={{ __html: formattedLeadSheet }}
        />
      )}
      {notation && notation.length > 0 && (
        <ul className="grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-16 pt-16 border-t break-inside-auto">
          {notation.map((leadSheet, i) => (
            <li className="relative">
              <a
                className="opacity-50 hover:opacity-100 transition"
                href={leadSheet.url}
                target="_blank"
              >
                <Image
                  alt={`Lead sheet for ${song.title}, page ${i + 1}`}
                  height={leadSheet.height}
                  layout="intrinsic"
                  src={leadSheet.url}
                  width={leadSheet.width}
                />
              </a>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default LeadSheet;
