import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { animeDatabase, studios } from "@/data/animeData";

const Index = () => {
  const navigate = useNavigate();

  const navigationItems = [
    {
      title: "Ввод и редактирование данных",
      description: "Добавление, изменение и удаление аниме и студий",
      icon: "Edit3",
      path: "/data-management",
      color: "bg-gradient-to-r from-purple-500 to-indigo-600",
    },
    {
      title: "Поиск по возрасту",
      description: "Найти аниме по возрастному рейтингу",
      icon: "Users",
      path: "/age-search",
      color: "bg-gradient-to-r from-blue-500 to-cyan-600",
    },
    {
      title: "Поиск эпизодов по году",
      description: "Двухэтапный поиск по количеству серий и году",
      icon: "Calendar",
      path: "/episode-search",
      color: "bg-gradient-to-r from-green-500 to-emerald-600",
    },
    {
      title: "Статистика",
      description: "Динамическая статистика базы данных",
      icon: "BarChart3",
      path: "/statistics",
      color: "bg-gradient-to-r from-orange-500 to-red-600",
    },
    {
      title: "Сведения о БД",
      description: "Информация о разработчике и функциях",
      icon: "Info",
      path: "/database-info",
      color: "bg-gradient-to-r from-pink-500 to-rose-600",
    },
  ];

  const stats = {
    totalAnime: animeDatabase.length,
    totalStudios: studios.length,
    animationStudios: studios.filter((s) => s.type === "animation").length,
    voiceStudios: studios.filter((s) => s.type === "voice").length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4 font-montserrat">
            🎌 Аниме База Данных
          </h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Система управления каталогом аниме с функциями поиска, статистики и
            редактирования
          </p>
          <div className="flex justify-center gap-8 mt-6 text-sm">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>

      {/* Navigation Cards */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {navigationItems.map((item, index) => (
            <Card
              key={index}
              className="group hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 border-0 overflow-hidden"
              onClick={() => navigate(item.path)}
            >
              <div className={`${item.color} p-1`}>
                <CardHeader className="bg-white p-6 text-center">
                  <div className="mx-auto mb-4 p-3 rounded-full bg-gray-100 w-16 h-16 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon
                      name={item.icon}
                      size={32}
                      className="text-gray-700"
                    />
                  </div>
                  <CardTitle className="text-lg font-semibold text-gray-800 mb-2">
                    {item.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    {item.description}
                  </CardDescription>
                </CardHeader>
              </div>
            </Card>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="mt-16 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800"></h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="">
              <div className="">{stats.totalAnime}</div>
              <div className="text-gray-600 text-sm"></div>
            </div>
            <div className="">
              <div className="">{stats.animationStudios}</div>
              <div className="text-gray-600 text-sm"></div>
            </div>
            <div className="">
              <div className="">{stats.voiceStudios}</div>
              <div className="text-gray-600 text-sm"></div>
            </div>
            <div className="">
              <div className="">
                {Math.round(
                  (animeDatabase.reduce((acc, anime) => acc + anime.rating, 0) /
                    animeDatabase.length) *
                    10,
                ) / 10}
              </div>
              <div className="text-gray-600 text-sm"></div>
            </div>
          </div>
        </div>

        {/* Featured Anime */}
        <div className="mt-16 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
            Топ аниме
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {animeDatabase
              .sort((a, b) => b.rating - a.rating)
              .slice(0, 3)
              .map((anime) => (
                <Card
                  key={anime.id}
                  className="group hover:shadow-lg transition-shadow"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                        {anime.rating}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">
                          {anime.title}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {anime.year} • {anime.episodes} эп.
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {anime.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
