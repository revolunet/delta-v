import { useMediaQuery } from 'react-responsive';

import { AgentRoute } from '@/components/molecules/RouteGuard/AgentRoute';
import { Meta } from '@/layout/Meta';
import { DeclarationPageDesktop } from '@/templates/DeclarationPageDesktop';
import DeclarationPageMobile from '@/templates/DeclarationPageMobile';
import { MainAgent } from '@/templates/MainAgent';

const Declaration = () => {
  const isMobile = useMediaQuery({
    query: '(max-width: 767px)',
  });

  return (
    <AgentRoute>
      <MainAgent
        meta={
          <Meta
            title="Simulateur Déclare Douanes"
            description="Simuler la déclaration de douane en quelques clics"
          />
        }
        withTitle
        withPadding
        titleHeader="Declaration"
        isMobile={isMobile}
      >
        {isMobile ? <DeclarationPageMobile /> : <DeclarationPageDesktop />}
      </MainAgent>
    </AgentRoute>
  );
};

export default Declaration;
