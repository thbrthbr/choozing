import {
  SingleEliminationBracket,
  SVGViewer,
} from '@g-loot/react-tournament-brackets';
import { useWindowSize } from '@uidotdev/usehooks';

const CustomMatchBracket = () => {
  const size = useWindowSize();
  let finalWidth: number;
  let finalHeight: number;
  if (size.width && size.height) {
    finalWidth = Math.max(size.width - 50, 500);
    finalHeight = Math.max(size.height - 100, 500);
  }

  let simple = [
    {
      id: 260002,
      name: 'Final - Match',
      nextMatchId: 260005, // Id for the nextMatch in the bracket, if it's final match it must be null OR undefined
      tournamentRoundText: '4', // Text for Round Header
      startTime: '2021-05-30',
      state: 'DONE', // 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | 'DONE' | 'SCORE_DONE' Only needed to decide walkovers and if teamNames are TBD (to be decided)
      participants: [
        {
          id: 'c016cb2a-fdd9-4c40-a81f-0cc6bdf4b9cc', // Unique identifier of any kind
          resultText: 'WON', // Any string works
          isWinner: false,
          status: 'PLAYED', // 'PLAYED' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | null
          name: 'giacomo123',
        },
        {
          id: '9ea9ce1a-4794-4553-856c-9a3620c0531b',
          resultText: null,
          isWinner: true,
          status: 'PLAYED', // 'PLAYED' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY'
          name: 'Ant',
        },
      ],
    },
    {
      id: 260005,
      name: 'Final - Match',
      nextMatchId: 260006, // Id for the nextMatch in the bracket, if it's final match it must be null OR undefined
      tournamentRoundText: '4', // Text for Round Header
      startTime: '2021-05-30',
      state: 'DONE', // 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | 'DONE' | 'SCORE_DONE' Only needed to decide walkovers and if teamNames are TBD (to be decided)
      participants: [
        {
          id: 'c016cb2a-fdd9-4c40-a81f-0cc6bdf4b9cc', // Unique identifier of any kind
          resultText: 'WON', // Any string works
          isWinner: false,
          status: 'PLAYED', // 'PLAYED' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | null
          name: 'giacomo123',
        },
        {
          id: '9ea9ce1a-4794-4553-856c-9a3620c0531b',
          resultText: null,
          isWinner: true,
          status: 'PLAYED', // 'PLAYED' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY'
          name: 'Ant',
        },
      ],
    },
    {
      id: 260006,
      name: 'Final - Match',
      nextMatchId: null, // Id for the nextMatch in the bracket, if it's final match it must be null OR undefined
      tournamentRoundText: '4', // Text for Round Header
      startTime: '2021-05-30',
      state: 'DONE', // 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | 'DONE' | 'SCORE_DONE' Only needed to decide walkovers and if teamNames are TBD (to be decided)
      participants: [
        {
          id: 'c016cb2a-fdd9-4c40-a81f0cc6bdf4b9cc', // Unique identifier of any kind
          resultText: 'WON', // Any string works
          isWinner: false,
          status: null, // 'PLAYED' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | null
          name: 'giacomo123',
        },
        {
          id: '9ea9ce1a-4794-4553-856c-9a3620c051b',
          resultText: null,
          isWinner: true,
          status: null, // 'PLAYED' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY'
          name: 'Ant',
        },
      ],
    },
    {
      id: 260004,
      name: 'Final - Match',
      nextMatchId: 260006, // Id for the nextMatch in the bracket, if it's final match it must be null OR undefined
      tournamentRoundText: '4', // Text for Round Header
      startTime: '2021-05-30',
      state: 'DONE', // 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | 'DONE' | 'SCORE_DONE' Only needed to decide walkovers and if teamNames are TBD (to be decided)
      participants: [
        {
          id: 'c016cb2a-fdd9-4c40-a81f-0cc6bdfb9cc', // Unique identifier of any kind
          resultText: 'WON', // Any string works
          isWinner: false,
          status: 'PLAYED', // 'PLAYED' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | null
          name: 'giacomo123',
        },
        {
          id: '9ea9ce1a-4794-4553-856c-9a3620c0531',
          resultText: null,
          isWinner: true,
          status: 'PLAYED', // 'PLAYED' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY'
          name: 'Ant',
        },
      ],
    },
  ];
  return (
    <SingleEliminationBracket
      matches={simple}
      options={{
        style: {
          roundHeader: { backgroundColor: '#AAA' },
          connectorColor: '#FF8C00',
          connectorColorHighlight: '#000',
        },
      }}
      //   svgWrapper={({ children, ...props }) => (
      //     <SVGViewer
      //       background="#231010"
      //       SVGBackground="#FFF"
      //       width={1500}
      //       height={200}
      //       {...props}
      //     >
      //       {children}
      //     </SVGViewer>
      //   )}
      matchComponent={({
        match,
        onMatchClick,
        onPartyClick,
        onMouseEnter,
        onMouseLeave,
        topParty,
        bottomParty,
        topWon,
        bottomWon,
        topHovered,
        bottomHovered,
        topText,
        bottomText,
        connectorColor,
        computedStyles,
        teamNameFallback,
        resultFallback,
      }) => (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            color: '#000',
            width: '100%',
            height: '100%',
          }}
        >
          <div
            onMouseEnter={() => onMouseEnter(topParty.id)}
            style={{ display: 'flex' }}
          >
            <div>{topParty.name || teamNameFallback}</div>
            <div>{topParty.resultText ?? resultFallback(topParty)}</div>
          </div>
          <div
            style={{ height: '1px', width: '100%', background: '#FF8C00' }}
          />
          <div
            onMouseEnter={() => onMouseEnter(bottomParty.id)}
            style={{ display: 'flex' }}
          >
            <div>{bottomParty.name || teamNameFallback}</div>
            <div>{bottomParty.resultText ?? resultFallback(topParty)}</div>
          </div>
        </div>
      )}
    />
  );
};
export default CustomMatchBracket;
