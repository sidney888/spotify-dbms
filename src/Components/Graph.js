import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';

const Graph = () => {
  const dataString = '[[7,2009,1.04854368932039],[11,2003,1.078125],[2,2010,1.08943089430894],[9,2006,1.19018404907975],[1,2003,1.2245145631068],[6,2015,1.2328190743338],[2,2015,1.17714285714286],[7,2005,1.16184971098266],[3,2009,1.20123839009288],[9,2010,1.1563786008230499],[9,2003,1.1156462585034],[10,2012,1.2336633663366299],[3,2011,1.1400000000000001],[3,2014,1.22916666666667],[5,2013,1.2631578947368398],[3,2000,1.2441860465116301],[8,2002,1.20588235294118],[6,2004,1.1259842519685],[2,2007,1.09375],[9,2004,1.06569343065693],[6,2000,1.07594936708861],[11,2000,1.23943661971831],[9,2000,1.13178294573643],[2,2009,1.1005291005290998],[4,2004,1.17857142857143],[5,2015,1.13819095477387],[6,2014,1.23529411764706],[10,2015,1.2654155495978598],[8,2011,1.2836676217765],[10,2002,1.312],[4,2010,1.07177033492823],[9,2012,1.19620253164557],[10,2006,1.26267281105991],[12,2013,1.1969696969697],[6,2011,1.05095541401274],[9,2002,1.08955223880597],[10,2014,1.34365325077399],[2,2011,1.1775147928994099],[4,2001,1.15254237288136],[12,2006,1.29192546583851],[4,2011,1.09810126582278],[1,2012,1.26684636118598],[12,2000,1.11111111111111],[2,2002,1.04761904761905],[3,2006,1.27891156462585],[9,2011,1.1870967741935499],[4,2002,1.16666666666667],[10,2003,1.11818181818182],[6,2005,1.15094339622642],[7,2000,1.07142857142857],[1,2011,1.2437325905292498],[1,2010,1.19907407407407],[9,2007,1.16923076923077],[4,2014,1.21383647798742],[8,2006,1.21008403361345],[11,2015,1.17667844522968],[7,2015,1.26748971193416],[6,2010,1.06329113924051],[12,2007,1.55681818181818],[11,2001,1.21052631578947],[6,2008,1.13058419243986],[1,2014,1.2739018087855298],[10,2005,1.15929203539823],[6,2013,1.20679886685552],[11,2004,1.3803680981595101],[5,2014,1.1361702127659599],[12,2005,1.21917808219178],[10,2000,1.21641791044776],[5,2007,1.3571428571428599],[6,2009,1.14828897338403],[2,2000,1.11818181818182],[3,2005,1.09782608695652],[9,2001,1.14814814814815],[2,2005,1],[8,2003,1.0405405405405401],[12,2015,1.28478964401294],[6,2007,1.19018404907975],[12,2004,1.08955223880597],[4,2009,1.09545454545455],[1,2006,1.28071928071928],[1,2000,1.19279661016949],[7,2010,1.07430340557276],[8,2009,1.0839694656488499],[5,2011,1.11964285714286],[8,2014,1.26732673267327],[9,2005,1.22727272727273],[5,2001,1.2877697841726599],[1,2004,1.1801925722145798],[4,2005,1.15384615384615],[10,2009,1.22072072072072],[2,2013,1.17241379310345],[5,2008,1.0934579439252299],[9,2009,1.1019736842105299],[6,2006,1.11065573770492],[8,2012,1.2248062015503898],[11,2005,1.19565217391304],[10,2011,1.27083333333333],[5,2004,1.40625],[6,2012,1.17880794701987],[5,2002,1.18604651162791],[3,2001,1.04878048780488],[3,2012,1.1858407079646],[7,2008,1.31168831168831],[7,2001,1.0952380952381],[3,2002,1.0508474576271198],[10,2010,1.090625],[8,2005,1.2403846153846199],[6,2002,1.1304347826087],[11,2013,1.1779661016949199],[4,2012,1.25167785234899],[11,2008,1.140625],[11,2014,1.21694915254237],[5,2006,1.3698630136986298],[4,2015,1.16113744075829],[1,2005,1.17600786627335],[2,2006,1.11111111111111],[9,2015,1.16137566137566],[5,2012,1.27777777777778],[7,2007,1.1904761904761898],[3,2007,1.17910447761194],[10,2007,1.12608695652174],[5,2003,1.08620689655172],[11,2009,1.1497005988023998],[8,2001,1.07865168539326],[3,2004,1.20744680851064],[12,2008,1.22950819672131],[2,2014,1.1500000000000001],[4,2007,1.3211009174311898],[1,2009,1.12862547288777],[12,2014,1.14942528735632],[12,2011,1.2771084337349399],[4,2006,1.07471264367816],[8,2004,1.1025641025641],[8,2008,1.10828025477707],[1,2013,1.35022026431718],[12,2009,1.21120689655172],[9,2014,1.25866666666667],[7,2006,1.1],[11,2012,1.1502145922746798],[5,2009,1.26470588235294],[3,2010,1.18152866242038],[3,2015,1.25333333333333],[11,2007,1.06451612903226],[7,2012,1.10108303249097],[2,2008,1.0754716981132098],[1,2007,1.17146282973621],[9,2008,1.29120879120879],[12,2001,1.20454545454545],[8,2013,1.13895781637717],[3,2008,1.1025641025641],[7,2011,1.24651162790698],[6,2003,1.15873015873016],[7,2002,1.17105263157895],[2,2001,1.12],[12,2012,1.21153846153846],[3,2013,1.42201834862385],[4,2013,1.1415384615384598],[1,2008,1.1412639405204499],[10,2013,1.21813031161473],[12,2003,1.1206896551724101],[1,2001,1.16282894736842],[5,2010,1.10544217687075],[2,2012,1.4052631578947399],[7,2014,1.2669172932330799],[7,2013,1.20060790273556],[10,2004,1.07534246575342],[12,2002,1.0394736842105299],[8,2007,1.20960698689956],[12,2010,1.13531353135314],[4,2000,1.1758241758241799],[10,2001,1.1386138613861398],[7,2004,1.01639344262295],[3,2003,1.1320754716981098],[11,2011,1.21475054229935],[6,2001,1.0625],[8,2015,1.1671232876712299],[1,2002,1.19160839160839],[9,2013,1.19741100323625],[1,2015,1.23897911832947],[5,2005,1.19791666666667],[10,2008,1.16666666666667],[7,2003,1.06756756756757],[11,2006,1.10160427807487],[8,2010,1.08268733850129],[11,2010,1.14385964912281],[2,2004,1.0952380952381],[4,2003,1.14492753623188],[2,2003,1.1796875],[8,2000,1.15254237288136],[5,2000,1.31481481481481],[11,2002,1.1197183098591499],[4,2008,1.11278195488722]]'

  const dataArray = JSON.parse(dataString);
  let xLabel, xIndex, yIndex;

  if (dataArray[0].length === 2) { // check if the input is in [year, value] format
    xLabel = 'Year';
    xIndex = 0;
    yIndex = 1;
    dataArray.sort((a, b) => a[0] - b[0]);
  } else { // assume the input is in [month, year, value] format
    xLabel = 'Month/Year';
    xIndex = 1;
    yIndex = 2;
    dataArray.sort((a, b) => {
      // compare year
      if (a[1] !== b[1]) {
        return a[1] - b[1];
      }
      // compare month if years are equal
      return a[0] - b[0];
    });
  }

  let labels;
  if(dataArray[0].length === 2){
    labels: dataArray.map((item) => item[xIndex].toString()) // use year or month/year as label depending on the format
  } else {
    labels: dataArray.map((item) => item.length === 3 ? `${item[0]}/${item[1]}` : item[1].toString())
  }

  const data = {
    labels: dataArray.map((item) => {
      if(item.length === 2){
        return item[xIndex].toString(); // use year or month/year as label depending on the format
      } else {
        return item.length === 3 ? `${item[0]}/${item[1]}` : item[1].toString();
      }
    }),
    //labels: dataArray.map((item) => item[xIndex].toString()), // use year or month/year as label depending on the format
    datasets: [
      {
        label: 'My Dataset',
        data: dataArray.map((item) => item[yIndex]), // use value as data for all formats
        borderColor: 'blue',
        fill: false,
      },
    ],
  };

  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const chart = new Chart(ctx, {
      type: 'line',
      data: data,
      options: {
        scales: {
          x: {
            type: 'category',
            title: {
              display: true,
              text: xLabel,
            },
          },
          y: {
            type: 'linear',
            position: 'left',
          },
        },
      },
    });
    return () => {
      chart.destroy();
    };
  }, [data]);

  return <canvas ref={canvasRef} />;
};

export default Graph;
