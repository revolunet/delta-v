import { Typography } from '@/components/atoms/Typography';
import { simulator } from '@/core/hoc/simulator.hoc';
import { Meta } from '@/layout/Meta';
import { Main } from '@/templates/Main';

const Accessibility = () => {
  return (
    <Main
      meta={<Meta title="Déclaration d’accessibilité" description="Établie le 20 mai 2024" />}
      withHeader
      withTitle
    >
      <div className="-mt-2 -mb-3 flex flex-col ">
        <Typography variant="h1" size="text-[40px]" weight="bold" color="black">
          Déclaration d’accessibilité
        </Typography>
        <Typography size="text-base" color="black">
          La direction interministérielle du numérique s’engage à rendre son service accessible,
          conformément à l’article 47 de la loi n° 2005-102 du 11 février 2005.
        </Typography>
        <p>
          Cette déclaration d’accessibilité s’applique à <strong>Déclare Douane</strong>
          <span>
            (<span>https://declare-douane.beta.gouv.fr</span>)
          </span>
          .
        </p>
        <div className="py-6 flex flex-col">
          <Typography variant="h2" size="text-[32px]" weight="bold" color="black">
            État de conformité
          </Typography>
          <Typography color="black">
            <strong>Déclare Douane</strong> est <strong>non conforme</strong> avec le{' '}
            <abbr title="Référentiel général d’amélioration de l’accessibilité">RGAA</abbr>.{' '}
            <span>Le site n’a encore pas été audité.</span>
          </Typography>
        </div>
        <div className="pb-6 flex flex-col">
          <Typography variant="h2" size="text-[32px]" weight="bold" color="black">
            Contenus non accessibles
          </Typography>

          <div className="flex flex-col gap-1 pt-2">
            <Typography color="black" weight="bold">
              Non conformité
            </Typography>
            <Typography color="black">
              En l’absence d’audit tous les contenus seront considérés comme non accessibles par
              hypothèse.
            </Typography>
          </div>
          <div className="flex flex-col gap-1 pt-2">
            <Typography color="black" weight="bold">
              Dérogations pour charge disproportionnée
            </Typography>
            <Typography color="black">
              En l’absence d’audit aucune dérogation n’a été établie.
            </Typography>
          </div>
          <div className="flex flex-col gap-1 pt-2">
            <Typography color="black" weight="bold">
              Contenus non soumis à l’obligation d’accessibilité
            </Typography>
            <Typography color="black">
              En l’absence d’audit aucun contenu n’a été identifié comme n’entrant pas dans le champ
              de la législation applicable.
            </Typography>
          </div>
          <div className="flex flex-col gap-1 pt-2">
            <Typography color="black" weight="bold">
              Technologies utilisées pour la réalisation du site « interieur.gouv.fr»
            </Typography>
            <Typography color="black">
              En l'absence d'audit aucune technologie n'a été utilisée.
            </Typography>
          </div>
          <div className="flex flex-col gap-1 pt-2">
            <Typography color="black" weight="bold">
              Agents utilisateurs, technologies d’assistance et outils utilisés pour vérifier
              l’accessibilité
            </Typography>
            <Typography color="black">
              En l’absence d’audit aucun agent utilisateur et aucune technologie d’assistance n’ont
              été utilisés.
            </Typography>
          </div>
          <div className="flex flex-col gap-1 pt-2">
            <Typography color="black" weight="bold">
              Les tests des pages web ont été effectués avec les combinaisons de navigateurs web et
              lecteurs d’écran suivants :
            </Typography>
            <Typography color="black">
              En l’absence d’audit aucune combinaison de navigateur et de lecteur d’écran n’a été
              utilisée.
            </Typography>
          </div>
          <div className="flex flex-col gap-1 pt-2">
            <Typography color="black" weight="bold">
              Les outils suivants ont été utilisés lors de l’évaluation :
            </Typography>
            <Typography color="black">
              En l’absence d’audit aucun outil n’a été utilisé lors de l’évaluation.
            </Typography>
          </div>
          <div className="flex flex-col gap-1 pt-2">
            <Typography color="black" weight="bold">
              Pages du site ayant fait l’objet de la vérification de conformité
            </Typography>
            <Typography color="black">
              En l’absence d’audit aucune page n’a fait l’objet de la vérification de conformité.
            </Typography>
          </div>
        </div>
        <div className="pb-6 flex flex-col">
          <Typography variant="h2" size="text-[32px]" weight="bold" color="black">
            Amélioration et contact
          </Typography>
          <p>
            Si vous n’arrivez pas à accéder à un contenu ou à un service, vous pouvez contacter le
            responsable de <span>Déclare Douane</span> pour être orienté vers une alternative
            accessible ou obtenir le contenu sous une autre forme.
          </p>
          <ul className="basic-information feedback h-card">
            <li>
              E-mail&nbsp;:{' '}
              <a href="mailto:stephane.sabalot-jungalas@beta.gouv.fr">
                stephane.sabalot-jungalas@beta.gouv.fr
              </a>
            </li>
          </ul>
        </div>
        <div className="pb-6 flex flex-col">
          <Typography variant="h2" size="text-[32px]" weight="bold" color="black">
            Voie de recours
          </Typography>
          <p>
            Cette procédure est à utiliser dans le cas suivant&nbsp;: vous avez signalé au
            responsable du site internet un défaut d’accessibilité qui vous empêche d’accéder à un
            contenu ou à un des services du portail et vous n’avez pas obtenu de réponse
            satisfaisante.
          </p>
          <p>Vous pouvez&nbsp;:</p>
          <ul>
            <li>
              Écrire un message au{' '}
              <a href="https://formulaire.defenseurdesdroits.fr/">Défenseur des droits</a>
            </li>
            <li>
              Contacter{' '}
              <a href="https://www.defenseurdesdroits.fr/saisir/delegues">
                le délégué du Défenseur des droits dans votre région
              </a>
            </li>
            <li>
              Envoyer un courrier par la poste (gratuit, ne pas mettre de timbre)&nbsp;:
              <br />
              Défenseur des droits
              <br />
              Libre réponse 71120 75342 Paris CEDEX 07
            </li>
          </ul>
          <hr />
          <p>
            Cette déclaration d’accessibilité a été créé le <span>20 mai 2024</span> grâce au{' '}
            <a href="https://betagouv.github.io/a11y-generateur-declaration/#create">
              Générateur de Déclaration d’Accessibilité de BetaGouv
            </a>
            .
          </p>
        </div>
      </div>
    </Main>
  );
};
export default simulator(Accessibility);
