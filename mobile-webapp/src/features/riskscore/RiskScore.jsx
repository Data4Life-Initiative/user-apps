import React, { useEffect } from 'react';
import { Container, Typography, CircularProgress, Button, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { CloseMenu } from '../../components/IconControls';
import { useDispatch, useSelector } from 'react-redux';
import { toggleMain, setActivePage } from '../menu/menuSlice';
import { selectLoginState } from '../menu/loginSlice';
import GaugeChart from 'react-gauge-chart'
import { selectRiskScore, fetchRiskScore, fetchRiskDetails } from './riskSlice';

const borderRadius = 18;
const width = '80%';
const lineHeight = 2.2;

const Label = ({ label }) => {
  const classes = useStyle();
  return <Typography className={classes.label}>{label}</Typography>;
};

const useStyle = makeStyles({
  container: {
    padding: 0,
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  heading: {
    fontFamily: ['Arial'],
    fontSize: 30,
  },
  headingRecommendation: {
    fontFamily: ['Arial'],
    fontSize: 24,
    textAlign: 'center'
  },
  headingRecommendationDetails: {
    fontFamily: ['Arial'],
    fontSize: 16,
    paddingBottom: 12,
    textAlign: 'justify'
  },
  guage: {
    width: 400,
    maxWidth: '100%'
  },
  footer: {
    alignSelf: 'end'
  },
  spinner: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    marginTop: 15,
    color: 'rgb(150,150,150)',
    fontFamily: ['Arial'],
    fontSize: 24,
  },
  testbutton: {
    fontSize: 14,
    lineHeight,
    width: '90%',
    marginTop: 20,
    fontFamily: ['Arial'],
    borderRadius: 18,
    // backgroundColor: 'rgb(92,200,77)',
  },

});

const RiskScore = () => {
  const dispatch = useDispatch();
  const risk = useSelector(selectRiskScore);
  const classes = useStyle();
  const { access_token } = useSelector(selectLoginState);
  
  useEffect(() => {
    dispatch(fetchRiskDetails(access_token));
    dispatch(fetchRiskScore(access_token));
  }, [dispatch]);

  const { riskScore, working, initing, riskPadding, riskValues } = risk;

  let paddedRiskScore = Math.min(riskScore + riskPadding, 9.99);

  const riskPercent = paddedRiskScore / 10;

  let recommendation = '';
  let recommendationDet = '';

  for (const riskOpt of Object.keys(riskValues)) {
    let risk = riskValues[riskOpt];
    if (risk) {
      if ((paddedRiskScore >= risk.lower_limit) && (paddedRiskScore <= risk.upper_limit)) {
        recommendation = risk.recommendation;
        recommendationDet = risk.recommendation_detail;
        break;
      }
    }
  }

  let isGetTest = recommendation.toLowerCase() === 'Get yourself tested'.toLowerCase();
  
  return (
    <Container className={classes.container}>
      <CloseMenu action={() => dispatch(setActivePage('home'))} />
      {(working || initing) ? (
        <Container className={classes.spinner}>
          <CircularProgress />
        </Container>
      ) : (
        <Container className={classes.content}>
          <Typography className={classes.heading}>
            RISK SCORE: {paddedRiskScore}
          </Typography>
          <Container className={classes.guage}>
            <GaugeChart 
            id="risk-score-chart" 
            nrOfLevels={5}
            percent={riskPercent}
            arcPadding={0}
            textColor="#000"
            hideText={true}
            cornerRadius={0}
            arcWidth={0.3}
            />
          </Container>         
          <Container className={classes.content}>
            <Label label="RECOMMENDATION:" />
            <Typography className={classes.headingRecommendation}>
              {recommendation}
            </Typography>
            <p/>
            <p/>
            <Container className={classes.content}>
              <Typography className={classes.headingRecommendationDetails}>
                {recommendationDet}
              </Typography>
              {
                isGetTest &&
                (
                  <Button
                  variant="contained"
                  color="primary"
                  className={classes.testbutton}
                  onClick={() => {}}
                  >
                    CLICK TO REQUEST A TEST
                  </Button>      
                )
              }
            </Container>  
          </Container>   
        </Container>
      )}
    </Container>
  );
};

export default RiskScore;
