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

const DatabaseInfo = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: "Database",
      title: "Управление данными",
      description:
        "Добавление, редактирование и удаление записей об аниме и студиях",
    },
    {
      icon: "Search",
      title: "Поиск по возрасту",
      description:
        "Фильтрация аниме по возрастному рейтингу с гибкими настройками диапазона",
    },
    {
      icon: "Calendar",
      title: "Двухэтапный поиск",
      description:
        "Синхронизированный поиск по количеству эпизодов и году выхода",
    },
    {
      icon: "BarChart3",
      title: "Статистика",
      description:
        "Динамические отчёты и аналитика по всем параметрам базы данных",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-purple-100">
      <div className="bg-gradient-to-r from-pink-600 to-rose-700 text-white py-8">
        <div className="container mx-auto px-4">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="text-white hover:bg-white/20 mb-4"
          >
            <Icon name="ArrowLeft" size={20} className="mr-2" />
            Назад
          </Button>
          <h1 className="text-4xl font-bold mb-2">ℹ️ Сведения о базе данных</h1>
          <p className="text-lg opacity-90">
            Информация о разработке и функциональности системы
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Информация о разработчике */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Icon name="User" size={24} className="mr-3 text-purple-600" />О
                разработчике
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                  <Icon name="Code" size={32} className="text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    Разработчик:{" "}
                  </h3>
                  <p className="text-gray-600"></p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <Icon
                    name="Zap"
                    size={32}
                    className="mx-auto mb-2 text-purple-600"
                  />
                  <div className="font-semibold">Быстрый поиск</div>
                  <div className="text-sm text-gray-600">
                    Мгновенная фильтрация
                  </div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <Icon
                    name="Shield"
                    size={32}
                    className="mx-auto mb-2 text-blue-600"
                  />
                  <div className="font-semibold">Надёжность</div>
                  <div className="text-sm text-gray-600">Проверка данных</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <Icon
                    name="Smartphone"
                    size={32}
                    className="mx-auto mb-2 text-green-600"
                  />
                  <div className="font-semibold">Адаптивность</div>
                  <div className="text-sm text-gray-600">
                    Работа на всех устройствах
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Цели базы данных */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Icon name="Target" size={24} className="mr-3 text-blue-600" />
                Цели и задачи
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Icon
                    name="CheckCircle"
                    size={20}
                    className="text-green-600 mt-1"
                  />
                  <div>
                    <h4 className="font-semibold">Централизованный каталог</h4>
                    <p className="text-gray-600 text-sm">
                      Создание единой базы данных аниме с подробной информацией
                      о сериалах, студиях и рейтингах
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Icon
                    name="CheckCircle"
                    size={20}
                    className="text-green-600 mt-1"
                  />
                  <div>
                    <h4 className="font-semibold">Удобный поиск</h4>
                    <p className="text-gray-600 text-sm">
                      Предоставление мощных инструментов поиска и фильтрации для
                      быстрого нахождения нужного контента
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Icon
                    name="CheckCircle"
                    size={20}
                    className="text-green-600 mt-1"
                  />
                  <div>
                    <h4 className="font-semibold">Аналитика</h4>
                    <p className="text-gray-600 text-sm">
                      Предоставление статистических данных и трендов в мире
                      аниме индустрии
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Функции системы */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Icon
                  name="Settings"
                  size={24}
                  className="mr-3 text-orange-600"
                />
                Основные функции
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg"
                  >
                    <Icon
                      name={feature.icon}
                      size={24}
                      className="text-purple-600 mt-1"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-800">
                        {feature.title}
                      </h4>
                      <p className="text-gray-600 text-sm">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Технические характеристики */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Icon name="Cpu" size={24} className="mr-3 text-red-600" />
                Технические характеристики
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-red-50 rounded-lg">
                  <div className="font-bold text-2xl text-red-600">50+</div>
                  <div className="text-sm text-gray-600">Записей аниме</div>
                </div>
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="font-bold text-2xl text-blue-600">8</div>
                  <div className="text-sm text-gray-600">Студий</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="font-bold text-2xl text-green-600">5</div>
                  <div className="text-sm text-gray-600">
                    Возрастных категорий
                  </div>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-lg">
                  <div className="font-bold text-2xl text-purple-600">100%</div>
                  <div className="text-sm text-gray-600">Адаптивность</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DatabaseInfo;
