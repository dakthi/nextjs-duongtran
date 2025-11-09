import { Container } from "@/components/layout/Container";
import { SectionTitle } from "@/components/SectionTitle";
import { Benefits } from "@/components/Benefits";
import { Testimonials } from "@/components/Testimonials";
import { Faq } from "@/components/Faq";
import { useTranslations } from 'next-intl';
import {
  FaceSmileIcon,
  ChartBarSquareIcon,
  CursorArrowRaysIcon,
  DevicePhoneMobileIcon,
  AdjustmentsHorizontalIcon,
  SunIcon,
} from "@heroicons/react/24/solid";
import { legacyMediaUrl } from "@/lib/media/media-client";

interface HomeContentProps {
  locale: string;
}

export function HomeContent({ locale }: HomeContentProps) {
  const t = useTranslations('home');

  const benefitOneImg = legacyMediaUrl('/img/lieu-liv-street.jpg');
  const benefitTwoImg = legacyMediaUrl('/img/lieu-vietnam.jpg');

  const benefitOne = {
    title: t('benefitOne.title'),
    desc: t('benefitOne.description'),
    image: benefitOneImg,
    bullets: (t.raw('benefitOne.bullets') as Array<{title: string, description: string}>).map((bullet, index) => ({
      title: bullet.title,
      desc: bullet.description,
      icon: [<FaceSmileIcon key={0} />, <ChartBarSquareIcon key={1} />, <CursorArrowRaysIcon key={2} />][index]
    }))
  };

  const benefitTwo = {
    title: t('benefitTwo.title'),
    desc: t('benefitTwo.description'),
    image: benefitTwoImg,
    bullets: (t.raw('benefitTwo.bullets') as Array<{title: string, description: string}>).map((bullet, index) => ({
      title: bullet.title,
      desc: bullet.description,
      icon: [<DevicePhoneMobileIcon key={0} />, <AdjustmentsHorizontalIcon key={1} />, <SunIcon key={2} />][index]
    }))
  };

  return (
    <>
      <div className="py-20">
        <SectionTitle
          preTitle={t('preTitle')}
          title={t('title')}
        >
          {t('description')}
        </SectionTitle>
      </div>

      <div className="py-20 bg-mint-green">
        <Benefits imgPos="left" data={benefitOne} />
      </div>

      <div className="py-20">
        <Benefits imgPos="right" size="large" data={benefitTwo} />
      </div>

      <div className="py-20 bg-mint-green">
        <SectionTitle
          preTitle={t('hearFromLieuPreTitle')}
          title={t('hearFromLieuTitle')}
        >
          {t.rich('hearFromLieuDescription', {
            em: (chunks) => <em>{chunks}</em>
          })}
        </SectionTitle>
      </div>

      <div className="py-20 bg-feldgrau">
        <Container className="text-center">
          <div className="text-xs font-semibold tracking-widest mb-3 text-jungle-green">
            {t('testimonialsPreTitle')}
          </div>
          <h2 className="max-w-3xl mx-auto text-3xl md:text-4xl font-sans font-bold leading-tight mb-6 text-white">
            {t('testimonialsTitle')}
          </h2>
          <p className="max-w-3xl mx-auto text-lg leading-relaxed text-mint-green font-medium mb-12">
            {t('testimonialsDescription')}
          </p>
        </Container>

        <Testimonials locale={locale} />
      </div>

      <div className="py-20">
        <SectionTitle preTitle={t('faqPreTitle')} title={t('faqTitle')}>
          {t('faqDescription')}
        </SectionTitle>

        <div className="mt-12">
          <Faq />
        </div>
      </div>
    </>
  );
}
