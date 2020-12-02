import React from "react";
import { Description } from "./ui/Description";
import { Column } from "./ui/Layout";
import cancelIcon from 'statics/cancel.svg';

const RulesModal = ({ onClose }) => {
  return (
    <Column className="rules-modal">
        <button className="rules-modal-close" onClick={onClose}><img src={cancelIcon} alt="close"/></button>
      <Description>
        Для учатия в розыгрыше призов вам необходимо заполнить форму участника,
        которая состоит из имени, ссылки на желаемый продукт Seagate в
        розыгрыше, электронной почты и истории на тему "Почему ты хочешь купить
        игровой диск Seagate". Если вы некорректно заполнили форму участника, то
        ваша форма участника не будет учтена в розыгрыше. Количество заявок на
        участие от одного человека не ограничено.
      </Description>
      <Description className="heading">Формат выбора победителей розыгрыша:</Description>
      <Description>
        1. Лучшая история в каждой из категории главных призов (3 категории)
        получают игровой диск Seagate. При заполнении формы участника учтите,
        что вы участвуете в розыгрыше именно того диска, на который вы указали
        ссылку. Ссылку на продукты вы можете получить в верхней части сайта,
        перейдя на один из магазинов-партнеров.
      </Description>
      <Description>
        2. Игровые джерси Team Empire и игровые фигкурки Dotakins Box Vinyl
        разыгрываются выборочно как поощрительный приз за понравившиеся истории,
        но не победившие в розыгрыше игровых дисков.
      </Description>

      <Description className="heading">Призы:</Description>
      <Description className="heading-sub">1. Главные призы:</Description>
      <Description>1 категория - Firecuda 510 Series</Description>
      <Description>2 категория - Firecuda 520 Series</Description>
      <Description>3 категория - Firecuda 120 Series</Description>

      <Description className="heading-sub">2. Поощрительные призы:</Description>
      <Description>- 5 игровых джерси Team Empire</Description>
      <Description>
        - 5 игровых фигкурок 1 категория - Dotakins Box Vinyl
      </Description>

      <Description>
        Итоги розыгрыша подводятся в группе вконтакте Team Empire -
        https://vk.com/empirepage. О сроках розыгрыша и дате проведения
        розыгрыша Вы сможете узнать в новостях в ранее указанной группе
        вконтакте Team Empire.
      </Description>

      <Description>
        Призы отправляются победителями в течении 30 календарных дней с момента
        опубликования итогов розыгрыша. Team Empire берет на себя расходы по
        отправлению приза. Для получения данных отправления с победителями
        свяжутся по электронной почте, указанной в форме участника. Team Empire
        не несет ответственности, если Вы указали неверный адрес электронной
        почты, не явились для получения приза или же указали неверный адрес
        доставки призов. При отсутствии ответа на запрос на электронной почте в
        течении 14 дней, Ваша победа в розыгрыше аннулируется.
      </Description>

      <Description>
        Team Empire оставляет за собой право изменить формат розыгрыша, даты
        проведения и подведения итогов.
      </Description>

      <Description>
        Отправляя форму участника вы автоматически принимаете правила розыгрыша,
        указанные в данном разделе.
      </Description>
    </Column>
  );
};

export { RulesModal };
