import en from "@/locales/en";
import es from "@/locales/es";
import { useRouter } from "next/router";
import Image from "next/image";
import images from "@/constants/images";

function NoDataMsg() {
  const router = useRouter();
  const { locale } = router;
  const t = locale === "es" ? es : en;
  return (
    <div className="text-white absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">
      <figure className="relative aspect-square">
        <Image src={images.noData} alt={""} fill className="object-contain" />
      </figure>
      <p className="font-bold text-2xl">{t.noDataMsg}</p>
    </div>
  );
}

export default NoDataMsg;
