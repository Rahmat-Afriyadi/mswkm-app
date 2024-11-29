const Card = ({ children }) => {
  return (
    <div className="overflow-hidden bg-white rounded-lg shadow">{children}</div>
  );
};

const CardBody = ({ children }) => {
  return <div className="px-4 py-5 sm:p-6">{children}</div>;
};
const CardFooter = ({ children }) => {
  return (
    <>
      <div className="px-4 py-4 bg-gray-50 sm:px-6">{children}</div>
    </>
  );
};

Card.Body = CardBody;
Card.Footer = CardFooter;

export default Card;
