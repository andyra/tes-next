import Image from "next/image";
import ChordSheetJS from 'chordsheetjs';

const LeadSheet = ({className, leadSheet = "", notation, title}) => {
  const parser = new ChordSheetJS.ChordProParser();
  const formatter = new ChordSheetJS.HtmlDivFormatter();
  const song = parser.parse(leadSheet);
  const formattedSong = formatter.format(song);

  return (
    <section className="space-y-16 lg:border-2 lg:border-primary-10 lg:rounded-xl lg:p-48 lg:shadow-lg xl:p-64" enabled={leadSheet}>
      {title &&
        <h2 className="font-medium text-3xl">{title}</h2>
      }
      {leadSheet &&
        <div
          className={className}
          dangerouslySetInnerHTML={{ __html: formattedSong }}
        />
      }
      {notation &&
        <ul className="grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-16 pt-16 border-t border-primary-10">
          {notation.map((leadSheet, i) => (
            <li className="relative">
              <a className="opacity-50 hover:opacity-100 transition" href={leadSheet.url} target="_blank">
                <Image
                  alt={`Lead sheet for ${title}, page ${i + 1}`}
                  height={240}
                  layout="intrinsic"
                  src={leadSheet.url}
                  width={240}
                />
              </a>
            </li>
          ))}
        </ul>
      }
    </section>
  )
}

export default LeadSheet;
