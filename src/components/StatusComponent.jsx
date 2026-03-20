import { Badge } from "@/components/ui/badge";

export const StatusComponent = ({ status }) => {
  // Un simple objet de mapping est plus lisible qu'un switch
  const statusStyles = {
    DRAFT: 'bg-grey-50 text-grey-700 dark:bg-grey-950 dark:text-grey-300',
    PUBLISHED: 'bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300',
    CLOSED: 'bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300',
    DELETED: 'bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300',
  };

  // On récupère la classe ou on met la valeur par défaut
  const className = statusStyles[status] || statusStyles.DRAFT;

  return (
    <Badge className={className}>
      {status}
    </Badge>
  );
};
