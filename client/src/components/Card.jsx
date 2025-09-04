const Card = ({ icon: Icon, title, description }) => {
  return (
    <div
      className="relative rounded-xl p-[1px] 
                 bg-gray-200 transition-all duration-500 
                 hover:bg-gray-700"
    >
      {/* Inner content */}
      <div
        className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl h-full p-6 
                   transform transition duration-300 hover:scale-105 hover:shadow-2xl"
      >
        {/* Icon */}
        <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 
                        flex items-center justify-center mb-4 shadow-md">
          <Icon className="w-6 h-6 text-white" />
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold mb-3 text-gray-800">{title}</h3>

        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

export default Card;
