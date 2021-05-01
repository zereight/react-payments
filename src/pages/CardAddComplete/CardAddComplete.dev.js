import { useHistory, useLocation, Redirect } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Styled from './CardAddComplete.styles';
import { Card, Input, Button } from '../../components';
import { MESSAGE, ROUTE } from '../../constants';
import { useFetch, useInput } from '../../hooks';
import { ScreenContainer } from '../../styles/common.styles';

const CardAddComplete = () => {
  const history = useHistory();
  const location = useLocation();
  const [targetCard, setTargetCard] = useState(location.state.card);

  const nickname = useInput('');

  const { data: cardList, setURL, setHeader, fetchUrl } = useFetch(
    `http://localhost:${process.env.REACT_APP_PORT}/cards`
  );

  //   const {
  //     id,
  //     cardCompanyName,
  //     cardCompanyColor,
  //     ownerName,
  //     expiryDate,
  //     cardNumbers,
  //   } = location.state.card;

  useEffect(() => {
    console.log(targetCard);
    setURL(`http://localhost:${process.env.REACT_APP_PORT}/cards/${targetCard.id}`);
    setHeader({ method: 'PATCH', body: targetCard });
    fetchUrl();
  }, [targetCard]);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('click');

    if (nickname.value) {
      console.log(cardList);
      const newCard = cardList.find((card) => card.id === targetCard.id);

      newCard.nickname = nickname.value;

      //   cardList.setValue(newCardList);
      setTargetCard(newCard);

      //   setURL(`http://localhost:${process.env.REACT_APP_PORT}/cards/${newCard.id}`);
      //   setHeader({ method: 'PATCH', body: newCard });
      //   fetchUrl();
    }

    history.push({
      pathname: ROUTE.HOME,
    });
  };

  if (!location.state?.card) return <Redirect to={ROUTE.HOME} />;

  return (
    <ScreenContainer>
      <Styled.Container>
        <Styled.Header>{MESSAGE.CARD_ADD_COMPLETE}</Styled.Header>
        <Card
          size="large"
          bgColor={targetCard.cardCompanyColor}
          companyName={targetCard.cardCompanyName}
          cardNumbers={targetCard.cardNumbers}
          ownerName={targetCard.ownerName}
          expiryDate={targetCard.expiryDate}
        />
        <form onSubmit={handleSubmit}>
          <Styled.InputContainer>
            <Input
              simple
              textAlign="center"
              placeholder="카드 별칭 (선택)"
              autoFocus
              maxLength={10}
              value={nickname.value}
              onChange={nickname.onChange}
            />
          </Styled.InputContainer>
          <Styled.ButtonContainer>
            <Button>확인</Button>
          </Styled.ButtonContainer>
        </form>
      </Styled.Container>
    </ScreenContainer>
  );
};

export default CardAddComplete;
